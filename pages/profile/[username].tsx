import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import styles from '@/styles/profile.module.css'
import axios from 'axios';
import Image from 'next/image';

interface User {
    userID: string;
    name: string;
    username: string;
    image: string;
    profile: string;
}

interface ProfileProps {
    user: User | null;
}

const gays = ["gay","very gay","like realy realy gay", "kinda gay","super duper gaylike it isn't even normal how gay he is","HELLA gay", "gay"];

const Profile = ({ user }: ProfileProps) => {
    const [imageUrl, setImageUrl] = useState<string>('/assets/images/default-avatar.png');
    const [randomWord, setRandomWord] = useState<string>('');

    useEffect(() => {
        if (user?.image) {
            const validateImage = async (url: string) => {
                try {
                    const response = await axios.get(`/api/validate-image?url=${encodeURIComponent(url)}`);
                    if (response.data.valid) {
                        setImageUrl(url);
                    } else {
                        setImageUrl('/assets/images/default-avatar.png');
                    }
                } catch {
                    setImageUrl('/assets/images/default-avatar.png');
                }
            };
            validateImage(user.image);
        }
    }, [user]);

    useEffect(() => {
        const word = gays[Math.floor(Math.random() * gays.length)];
        setRandomWord(word);
    }, []);

    if (!user) {
        return <p>User not found</p>;
    }

  return (
    <div>
        <div className={styles.profile}>
            <div className={styles.profileInfo}>
            <Image src={imageUrl} alt={user.name} height={100} width={100} objectFit="contain" className={styles.profileImage}/>
            <h1 className={styles.title}>{user.name}</h1>
            </div>
            {user.profile ? (
                <iframe src={user.profile} width="90%" height="700px" />
            ) : (
                <div className={styles.defaultProfile}>
                    <p className={styles.defaultText}>This is <span className={styles.defaultname}>{user.name}</span></p>
                    <Image src={imageUrl} style={{width: "30vh", height: "30vh"}} alt={`${user.name}'s avatar`} width={350} height={100} className={styles.defaultImage}/>
                    <p className={styles.defaultTextSmall}>and {user.username} is <span className={styles.defaultRandom}>{randomWord}</span>.</p>
                </div>
            )}

        </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { username } = context.params!;
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/Members.json', 'utf8');
    const members = JSON.parse(fileContents)[0];

    let user: User | null = null;
    for (const role in members) {
        const foundUser = members[role].find((member: User) => member.username === username);
        if (foundUser) {
            user = foundUser;
            break;
        }
    }

    return {
        props: {
            user,
        },
        revalidate: 10, // Revalidate at most once every 10 seconds
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/Members.json', 'utf8');
    const members = JSON.parse(fileContents)[0];

    const paths = [];
    for (const role in members) {
        for (const member of members[role]) {
            paths.push({
                params: {
                    username: member.username,
                },
            });
        }
    }

    return {
        paths,
        fallback: 'blocking', // or 'true' or 'false'
    };
};

export default Profile;