// @/components/modals/SettingsModal.tsx
import React, { useState } from 'react';
import styles from '@/styles/settingsModal.module.css';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>(''); // Ensure useState is properly defined
  const [loading, setLoading] = useState<boolean>(false); // Ensure useState is properly defined

  const addUserToMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/add-member');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding user to members');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Ensure the modal is only rendered when open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Settings</h2>
        <div>
          <label className={styles.Lable_title}>General Settings</label>
          <div>
            {/* Add the button here */}
            <button onClick={addUserToMembers} disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </button>
            {message && <p>{message}</p>} {/* Display the message */}
          </div>
        </div>
        <div>
          <label className={styles.Lable_title}>Language</label>
          <select className={styles.select}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;