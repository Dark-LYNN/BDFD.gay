// pages/api/discordUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const DISCORD_API_URL = 'https://discord.com/api/v10';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!userId || !botToken) {
    return res.status(400).json({ error: 'Missing userId or botToken' });
  }

  try {
    const response = await axios.get(`${DISCORD_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    const { username, discriminator } = response.data;
    const displayName = `${username}#${discriminator}`;

    res.status(200).json({ displayName });
    console.log(displayName);
  } catch (error) {
    console.error('Error fetching user data from Discord:', error);
    res.status(500).json({ error: 'Failed to fetch user data from Discord' });
  }
}
