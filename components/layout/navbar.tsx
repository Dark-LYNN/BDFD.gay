import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import LoginButton from '@/components/interface/loginButton';
import styles from '@/styles/navbar.module.css'
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
    const router = useRouter();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const changeLanguage = (locale: 'en-US' | 'de-DE' | 'ar-SA' | 'nl-NL' | 'it-IT' | 'pl-PL' | 'ru-RU' | 'tr-TR' | 'pirate') => {
        const pathname = router.pathname;
        router.push(pathname, pathname, { locale });
        setIsMenuVisible(false);
    };
    
    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
    
            // Check if the clicked area is not the menu or the toggle button
            if (target && !target.closest(`.${styles.language__menu}`) && toggleButtonRef.current && !toggleButtonRef.current.contains(target)) {
                setIsMenuVisible(false);
            }
        };
    
        document.addEventListener('click', handleDocumentClick);
    
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isMenuVisible]);




    return (
    <>
        <nav className={styles.navbar}>
            <div>
                <Link href="/">
                    <div className={styles.logo}>
                        <Image src={"/assets/favicon.png"} alt='BDFD.gay' width={50} height={50}></Image>
                        <p className={styles.rainbowText}>BDFD.gay</p>
                    </div>
                </Link>
            </div>
            <div className={`${styles.navbar__side} ${styles.navbar__user}`}>
                <span aria-label={styles.language} data-text={styles.language} className={`${styles.tooltip} ${styles.is_bottom}`}>
                </span>
                <LoginButton />
            </div>
        </nav>
    </>
    );
};

export default Navbar;