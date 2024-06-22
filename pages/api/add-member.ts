import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { Member, Staff } from '@/types/index';
import fetchDisplayName from '@/utils/fetchDisplayName';


const isUserInStaffData = (staff: Staff, userID: number): boolean => {
  return staff.developer.some(member => member.userID === userID) ||
         staff.communityManager.some(member => member.userID === userID) ||
         staff.member.some(member => member.userID === userID);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userID = session.user.id as unknown as number;
  const userName = session.user.name as unknown as string;
  const userImage = session.user.image as unknown as string;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const global_name = await fetchDisplayName(userID);

  if (!botToken) {
    return res.status(500).json({ message: 'Discord bot token is not configured' });
  }

  let displayName: string;
  try {
    displayName = await fetchDisplayName(userID);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch display name from Discord' });
  }

  const filePath = path.resolve(process.cwd(), 'data/Members.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const staff: Staff = JSON.parse(jsonData)[0]; // Assuming the JSON is an array with one object

  // Check if the user is already in any of the arrays
  if (isUserInStaffData(staff, userID)) {
    return res.status(400).json({ message: 'User is already a member' });
  }

  const newMember: Member = {
    userID,
    name: displayName,
    username: userName,
    image: userImage,
  };

  staff.member.push(newMember);

  fs.writeFileSync(filePath, JSON.stringify([staff], null, 2));
  console.log('New Member added:', newMember);
  return /* res.status(200).json({ message: 'User added to members', newMember }) */;
};

export default handler;