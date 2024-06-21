import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const DISCORD_API_URL = 'https://discord.com/api/v10';
const GUILD_ID = '566363823137882154';
const ROLE_PRIORITY = {
  developer: '566622558158454802',
  toaster: '820397594429095966',
  communityManager: '567473943452057611',
  moderators: '566364651986747392',
};

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const ensureFileExists = async (filePath: string, initialContent: object) => {
  if (!fs.existsSync(filePath)) {
    await writeFileAsync(filePath, JSON.stringify(initialContent, null, 2));
  }
};

const getUserRoles = async (userId: string, accessToken: string) => {
  try {
    const response = await axios.get(`${DISCORD_API_URL}/guilds/${GUILD_ID}/members/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.roles;
  } catch (error) {
    console.error('Error fetching user roles:', error);
    throw new Error('Failed to fetch user roles');
  }
};

const handleVerifyRole = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user || !session.accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id as string;
  const accessToken = session.accessToken as string;

  try {
    const userRoles = await getUserRoles(userId, accessToken);

    let userCategory = 'member';
    for (const [category, roleId] of Object.entries(ROLE_PRIORITY)) {
      if (userRoles.includes(roleId)) {
        userCategory = category;
        break;
      }
    }

    // Fetch user info from Discord API
    const userInfoResponse = await axios.get(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userInfoResponse.data;

    // File path for staffmembers.json
    const filePath = path.resolve('./data', 'Members.json');
    
    // Ensure the file exists
    await ensureFileExists(filePath, {
      developer: [],
      communityManager: [],
      toaster: [],
      moderators: [],
      member: [],
    });

    // Read current staff members data
    const fileData = await readFileAsync(filePath, 'utf-8');
    const staffData = JSON.parse(fileData);

    // Add user to the appropriate category
    staffData[userCategory].push({
      userID: userId,
      name: userInfo.username,
      username: userInfo.username,
      image: userInfo.avatar
        ? `https://cdn.discordapp.com/avatars/${userId}/${userInfo.avatar}.webp`
        : null,
    });

    // Write updated data back to the file
    await writeFileAsync(filePath, JSON.stringify(staffData, null, 2));

    return res.status(200).json(staffData);
  } catch (error) {
    console.error('Error verifying role:', error);
    return res.status(500).json({ message: 'Error verifying role' });
  }
};

export default handleVerifyRole;