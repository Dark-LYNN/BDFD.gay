// components/StaffMembers.tsx
import React, { useEffect, useState } from 'react';
import { Member, Staff } from '@/types';
import styles from '@/styles/members.module.css';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import StaffMemberslist from '@/data/Members.json';

const defaultStaff: Staff = {
    developer: [],
    communityManager: [],
    toaster: [],
    moderator: [],
    member: [],
};

interface StaffMembersProps {
    staff: Staff;
}
  

const StaffMembers: React.FC<StaffMembersProps> = ({ staff }) => {
    const { t } = useTranslation('common');

    const [validatedStaff, setValidatedStaff] = useState<Staff>(defaultStaff);

  useEffect(() => {
    const preloadImage = (url: string) => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    const validateImages = async (members: Member[]) => {
      for (const member of members) {
        const isValid = await preloadImage(member.image);
        if (!isValid) {
          member.image = '/assets/images/default-avatar.png';
        }
      }
    };

    const validateStaff = async (staff: Staff) => {
      await Promise.all([
        validateImages(staff.developer),
        validateImages(staff.communityManager),
        validateImages(staff.toaster),
        validateImages(staff.moderator),
        validateImages(staff.member),
      ]);
      setValidatedStaff(staff);
    };

    validateStaff(staff);
  }, [staff]);
      console.log('Staff object:', staff);
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Developers')}</h3>
                <div className={styles.members}>
                    {staff.developer.map((dev) => (
                        <Link href={`./profile/${dev.name}`} className={styles.userFrame} key={dev.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                            <img src={dev.image} alt={dev.name} className={styles.avatar} />                                <div className={styles.info}>
                                    <p className={styles.name}>{dev.name}</p>
                                    <p className={styles.username}>@{dev.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Community Manager')}</h3>
                <div className={styles.members}>
                    {staff.communityManager.map((cm) => (
                        <Link href={`./profile/${cm.name}`} className={styles.userFrame} key={cm.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <img src={cm.image} alt={cm.name} className={styles.avatar} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{cm.name}</p>
                                    <p className={styles.username}>@{cm.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Toaster')}</h3>
                <div className={styles.members}>
                    {staff.communityManager.map((user) => (
                        <Link href={`./profile/${user.name}`} className={styles.userFrame} key={user.userID}>
                            <div className={styles.member}>
                                <img src={user.image} alt={user.name} className={styles.avatar} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{user.name}</p>
                                    <p className={styles.username}>@{user.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Moderator')}</h3>
                <div className={styles.members}>
                    {staff.moderator.map((user) => (
                        <Link href={`./profile/${user.name}`} className={styles.userFrame} key={user.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <img src={user.image} alt={user.name} className={styles.avatar} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{user.name}</p>
                                    <p className={styles.username}>@{user.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Members')}</h3>
                <div className={styles.members}>
                    {staff.member.map((member) => (
                        <Link href={`./profile/${member.name}`} className={styles.userFrame} key={member.userID}>
                            <div className={styles.member}>
                                <img src={member.image} alt={member.name} className={styles.avatar} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{member.name}</p>
                                    <p className={styles.username}>@{member.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaffMembers;