import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Member {
  userID: number;
  name: string;
  username: string;
  image: string;
}

interface StaffData {
  developer: Member[];
  communityManager: Member[];
  member: Member[];
}

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

    const filePath = path.resolve(process.cwd(), 'data/staffmembers.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const staff: StaffData = JSON.parse(jsonData);

  // Check if the user is already a member
  const isAlreadyMember = staff.member.some(member => member.userID === userID);

  if (isAlreadyMember) {
    return res.status(400).json({ message: 'User is already a member' });
  }

  const newMember: Member = {
    userID,
    name: userName,
    username: userUsername,
    image: userImage,
  };

  staff.member.push(newMember);

  fs.writeFileSync(filePath, JSON.stringify(staff, null, 2));

  return res.status(200).json({ message: 'User added to members', newMember });
};

export default handler;
