import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Staff, Member } from '@/types';

const removeUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  const filePath = path.resolve(process.cwd(), 'data/Members.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const staff: Staff = JSON.parse(jsonData)[0];

  const removeUserFromGroup = (members: Member[]) => {
    const index = members.findIndex((member) => member.userID === userId);
    if (index !== -1) {
      members.splice(index, 1);
    }
  };

  removeUserFromGroup(staff.developer);
  removeUserFromGroup(staff.communityManager);
  removeUserFromGroup(staff.toaster);
  removeUserFromGroup(staff.moderator);
  removeUserFromGroup(staff.member);

  fs.writeFileSync(filePath, JSON.stringify([staff], null, 2));

  return res.status(200).json({ message: 'User removed successfully' });
};

export default removeUser;
