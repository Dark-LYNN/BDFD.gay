import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'querystring';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const callbackUrl = `${process.env.NEXTAUTH_URL}callback/discord-custom`;

  const params = encode({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: callbackUrl,
    response_type: 'code',
    scope: 'identify email guilds.members.read',
    state: JSON.stringify({ callbackUrl: req.query.callbackUrl || '/' }),
  });

  const discordAuthUrl = `https://discord.com/oauth2/authorize?${params}`;

  res.redirect(discordAuthUrl);
};
