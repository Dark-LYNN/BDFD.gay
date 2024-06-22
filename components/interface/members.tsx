// components/StaffMembers.tsx
import React, { useEffect, useState } from 'react';
import { Member, Staff } from '@/types';
import styles from '@/styles/members.module.css';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import StaffMemberslist from '@/data/Members.json';
import Img from 'next/image';
const defaultStaff: Staff = {
    developer: [],
    communityManager: [],
    toaster: [],
    moderator: [],
    support: [],
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

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Developers')}</h3>
                <div className={styles.members}>
                    {staff.developer.map((dev) => (
                        <Link href={`./profile/${dev.username}`} className={styles.userFrame} key={dev.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <Img src={dev.image} alt={dev.name} className={styles.avatar} width={100} height={100}/>
                                <div className={styles.info}>
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
                        <Link href={`./profile/${cm.username}`} className={styles.userFrame} key={cm.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <Img src={cm.image} alt={cm.name} className={styles.avatar} width={100} height={100}/>
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
                    {staff.toaster.map((user) => (
                        <Link href={`./profile/${user.username}`} className={styles.userFrame} key={user.userID}>
                            <div className={styles.member}>
                                <Img src={user.image} alt={user.name} className={styles.avatar} width={100} height={100}/>
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
                    {staff.moderator.map((mod) => (
                        <Link href={`./profile/${mod.username}`} className={styles.userFrame} key={mod.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <Img src={mod.image} alt={mod.name} className={styles.avatar} width={100} height={100}/>
                                <div className={styles.info}>
                                    <p className={styles.name}>{mod.name}</p>
                                    <p className={styles.username}>@{mod.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <h3 className={styles.roleName}>{t('Support')}</h3>
                <div className={styles.members}>
                    {staff.support.map((support) => (
                        <Link href={`./profile/${support.username}`} className={styles.userFrame} key={support.userID}> {/* Key should be here */}
                            <div className={styles.member}>
                                <Img src={support.image} alt={support.name} className={styles.avatar} width={100} height={100}/>
                                <div className={styles.info}>
                                    <p className={styles.name}>{support.name}</p>
                                    <p className={styles.username}>@{support.username}</p>
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
                        <Link href={`./profile/${member.username}`} className={styles.userFrame} key={member.userID}>
                            <div className={styles.member}>
                                <Img src={member.image} alt={member.name} className={styles.avatar} width={100} height={100}/>
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