import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import axios from 'axios';
import { DiscordProfile } from '@/types/discordProfile';

const authHandler: NextApiHandler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      authorization: { params: { scope: 'identify' } }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && profile && account.provider === 'discord') {
        const discordProfile = profile as DiscordProfile;
        const userId = discordProfile.id;
        const imageUrl = discordProfile.avatar
          ? `https://cdn.discordapp.com/avatars/${userId}/${discordProfile.avatar}.png`
          : '/assets/images/default-avatar.png';

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-user-image`, {
            userId,
            name: user.name,
            username: user.name, // or use profile.username if available
            imageUrl,
          });
        } catch (error) {
          console.error('Error updating user image:', error);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
      }
      return session;
    }
  }
});

export default authHandler;
