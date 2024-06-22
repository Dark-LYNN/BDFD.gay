import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/profileInput.module.css';

interface CustomInputProps {
  userId: string;
}

const blockedDomains = ["pornhub.com", "xvideos.com", "onlyfans.com"]; // Add blocked domains here

const CustomInput: React.FC<CustomInputProps> = ({ userId }) => {
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/get-members');
      const members = response.data[0];

      let user = null;
      for (const role in members) {
        user = members[role].find((member: any) => member.userID === userId);
        if (user) break;
      }

      if (user) {
        setProfileLink(user.profile);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileLink(e.target.value);
  };

  const handleSave = async () => {
    const url = new URL(profileLink);
    const domain = url.hostname;

    if (blockedDomains.some(blockedDomain => domain.includes(blockedDomain))) {
      setError('The provided domain is not allowed.');
      return;
    }

    await axios.post('/api/update-member-profile', { userId, profileLink });  };

  return (
    <>
      <div className={styles.inputFrame}>
      <label className={styles.label} htmlFor="profileLink">Profile Link</label>
      <input className={styles.input} type="text" id="profileLink" value={profileLink} onChange={handleChange}/>
      <button className={styles.button} onClick={handleSave}>Save</button>
      {error && <p className={styles.error}>{error}</p>}
      </div>
    </>
  );
};

export default CustomInput;
