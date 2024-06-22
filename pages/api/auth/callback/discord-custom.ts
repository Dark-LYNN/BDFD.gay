import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { encode } from 'querystring';
import { parse } from 'url';

const DISCORD_API_URL = 'https://discord.com/api/v10';
const GUILD_ID = '566363823137882154';
const ROLE_PRIORITY = {
  developer: '566622558158454802',
  communityManager: '567473943452057611',
  toaster: '820397594429095966',
  moderators: '566364651986747392',
  member: '', // Added to ensure member is part of the RoleCategory
};

type RoleCategory = keyof typeof ROLE_PRIORITY;

const fetchAccessToken = async (code: string) => {
  const response = await axios.post(
    `${DISCORD_API_URL}/oauth2/token`,
    encode({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/discord-custom`,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

const getUserRoles = async (userId: string, accessToken: string) => {
  const response = await axios.get(`${DISCORD_API_URL}/guilds/${GUILD_ID}/members/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.roles;
};

const getUserInfo = async (accessToken: string) => {
  const response = await axios.get(`${DISCORD_API_URL}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = parse(req.url as string, true);
    const { code } = query;

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const accessToken = await fetchAccessToken(code as string);
    const userInfo = await getUserInfo(accessToken);
    const userRoles = await getUserRoles(userInfo.id, accessToken);

    let userCategory: RoleCategory = 'member';
    for (const [category, roleId] of Object.entries(ROLE_PRIORITY)) {
      if (roleId && userRoles.includes(roleId)) {
        userCategory = category as RoleCategory;
        break;
      }
    }

    // Mock JSON Data
    const staffData: Record<RoleCategory, any[]> = {
      developer: [],
      communityManager: [],
      toaster: [],
      moderators: [],
      member: [],
    };

    // Add user to the appropriate category
    staffData[userCategory].push({
      userID: userInfo.id,
      name: userInfo.username,
      username: userInfo.username,
      image: userInfo.avatar
        ? `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.webp`
        : null,
    });

    return res.status(200).json(staffData);
  } catch (error) {
    console.error('Error handling callback:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
