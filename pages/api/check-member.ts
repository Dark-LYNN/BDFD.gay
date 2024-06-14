import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Member, Staff } from '@/types/index';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ message: 'Missing userID' });
  }

  const filePath = path.resolve(process.cwd(), 'data/staffmembers.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const staff: Staff = JSON.parse(jsonData)[0];

  const isUserInStaffData = (userID: number): boolean => {
    return staff.developer.some((member: Member) => member.userID === userID) ||
           staff.communityManager.some((member: Member) => member.userID === userID) ||
           staff.member.some((member: Member) => member.userID === userID);
  };

  const userExists = isUserInStaffData(Number(userID));

  return res.status(200).json({ userExists });
};

export default handler;