import axios from 'axios';

const fetchDisplayName = async (userID: number): Promise<string> => {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    if (!botToken) {
        throw new Error('Discord bot token is not defined');
    }

    try {
        const response = await axios.get(`https://discord.com/api/v10/users/${userID}`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            },
            
        });
        console.log(response.data);
        return response.data.global_name;
        
    } catch (error) {
        console.error('Error fetching display name:', error);
        throw new Error('Failed to fetch display name from Discord');
    }
};

export default fetchDisplayName;
