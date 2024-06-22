// @/pages/404.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import Img from 'next/image';
import styles from '@styles/404.module.css'
import Link from 'next/link';

const Custom404 = () => {
    const PaddingBottom: React.CSSProperties = { paddingBottom: "1rem" };
  
    return (
        < >
            <div className={styles.body}>
                <div className={styles.container}>
                    <Img style={PaddingBottom} width="500" height="500" src="/assets/images/svg/NotFound.svg" alt="not-found" className={styles.img} />

                    <h4 className={styles.h1} style={{ backgroundColor: 'transparent', paddingBottom: '1rem' }}>The page you&apos;re looking for can&apos;t be found.</h4>
                    <Link className={styles.button} href="/">Home</Link>
                </div>
            </div>
        </>
    );
}

  
export default Custom404;