// @/components/layour/footer.tsx
import React, { useState } from 'react';
import styles from '@/styles/footer.module.css'
import Link from 'next/link'; 
import Image from 'next/image';


const Footer = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    return (
        <>
            <footer className={styles.footer}>
                <div className={`${styles.copyright} color-white text-center`}>© 2024 <span className={styles.pinkie}>BDFD.gay</span>. Made with ❤️ by <Link href="https://lynnux.xyz"><span className={styles.pinkie}>Lynnux</span></Link>.</div> 
                <br/>
            </footer>
        </>
    );
};
export default Footer;
