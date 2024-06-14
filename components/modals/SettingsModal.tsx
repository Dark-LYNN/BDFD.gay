// @/components/modals/SettingsModal.tsx
import React, { useEffect, useState } from 'react';
import styles from '@/styles/settingsModal.module.css';
import { useSession } from 'next-auth/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Retrieve setting from localStorage if it exists

  // Check if the user is a staff member
  useEffect(() => {
    const checkStaff = async () => {
      if (session) {
        const res = await fetch('/api/check-member');
        const data = await res.json();
        setIsStaff(data.isStaff);
        setLoading(false);
      }
    };

    checkStaff();
  }, [session]);

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
          <div>
            {/* Add the button here */}
            <button disabled={loading || isStaff}>
              {isStaff ? 'You are already a staff member' : 'Apply to become a staff member'}
            </button>
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
