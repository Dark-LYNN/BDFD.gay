import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import staffData from '@/data/Members.json';

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
    const session = await getSession({ req });
  
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const userID = session.user.id as unknown as number;
    const staff = staffData as unknown as StaffData;
  
    const isStaff = Object.values(staff).some((group: Member[]) => {
        if (Array.isArray(group)) {
          return group.some((member: Member) => member.userID === userID);
        }
        return false;
      });  
    res.status(200).json({ isStaff });
  };
  
  export default handler;