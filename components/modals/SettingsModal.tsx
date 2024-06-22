import styles from '@/styles/settingsModal.module.css';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import ProfileInput from '@/components/interface/profileInput';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const blockedUserIds = ["123456789", "987654321"];

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);
  
  const addUserToMembers = async () => {
    const userId = session?.user?.id;
    if (blockedUserIds.includes(`${userId}`)) {
      setMessage('You are not allowed to be added.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/add-member');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('You are already added.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') {
    return <p>You need to be authenticated to view this page.</p>;
  }
  const userId = session?.user?.id;
  
  const removeUser = async () => {
    if (!session || !session.user) {
      setMessage('User session not found');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/remove-user', { userId: session.user.id });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error removing user');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Settings</h2>
        <div>
          <label className={styles.Lable_title}>General Settings</label>
          <div className={styles.addDiv}>
            <div>
              <button className={styles.addButton} onClick={addUserToMembers} disabled={isButtonDisabled || loading}>
                {loading ? 'Adding...' : 'Get Added'}
              </button>
              <button className={styles.removeButton} onClick={removeUser} disabled={loading}>
                {loading ? 'Removing...' : 'Remove User'}
              </button>              
              {/*<button className={styles.verifyButton} onClick={verifyRole} disabled={false}>
                {loading ? 'Verifying...' : 'Verify your role'}
              </button>*/}
            </div>
            {message && <p>{message}</p>}
            <br/>
            <ProfileInput userId={`${userId}`} />
          </div>
        </div>
{/*
        <div>
          <label className={styles.Lable_title}>Language</label>
          <select className={styles.select}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
*/}
      </div>
    </div>
  );
};

export default SettingsModal;
