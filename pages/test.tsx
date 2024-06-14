// pages/index.tsx
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState('');

  const fetchDisplayName = async () => {
    try {
      const response = await axios.get('/api/discordUser', {
        params: { userId },
      });
      setDisplayName(response.data.displayName);
    } catch (error) {
      console.error('Error fetching display name:', error);
    }
  };

  return (
    <div>
      <h1>Fetch Discord User Display Name</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchDisplayName}>Fetch Display Name</button>
      {displayName && <p>Display Name: {displayName}</p>}
    </div>
  );
};

export default Home;
