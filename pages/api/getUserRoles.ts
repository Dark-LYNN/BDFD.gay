import axios from 'axios';
import { getSession } from 'next-auth/react';

const getUserRoles = async (userId: string, accessToken: string) => {

    try {
        const response = await axios.get(`https://discord.com/api/v10/guilds/566363823137882154/members/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.roles;
    } catch (error) {
        console.error('Error fetching user roles:', error);
        throw new Error('Failed to fetch user roles');
    }
};

const getGuildRoles = async (accessToken: string) => {
  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/566363823137882154/roles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching guild roles:', error);
    throw new Error('Failed to fetch guild roles');
  }
};

const getHighestRole = async (userId: string, accessToken: string) => {
    const userRoles = await getUserRoles(userId, accessToken);
    const guildRoles = await getGuildRoles(accessToken);
  
    const sortedRoles = guildRoles.sort((a: any, b: any) => b.position - a.position);
  
    for (const role of sortedRoles) {
        if (userRoles.includes(role.id)) {
            return role;
        }
    }

    return null;
};

const handleVerifyRole = async () => {
    const session = await getSession({ req });


    if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id; // Replace with the user's ID
    const accessToken = 'user-access-token'; // Replace with the user's access token
  
    try {
        const highestRole = await getHighestRole(userId, accessToken);
        if (highestRole) {
            console.log(`Highest role: ${highestRole.name}`);
        } else {
            console.log('No roles found for the user.');
        }
    } catch (error) {
      console.error('Error verifying role:', error);
    }
  };
  