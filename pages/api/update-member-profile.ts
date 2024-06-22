import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, profileLink } = req.body;

    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/Members.json', 'utf8');
    const members = JSON.parse(fileContents);

    let updated = false;
    for (const role in members[0]) {
      const user = members[0][role].find((member: any) => member.userID === userId);
      if (user) {
        user.profile = profileLink;
        updated = true;
        break;
      }
    }

    if (updated) {
      await fs.writeFile(jsonDirectory + '/Members.json', JSON.stringify(members, null, 2));
      res.status(200).json({ message: 'Profile link updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
