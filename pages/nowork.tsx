// pages/tailwind-test.tsx
import { GetStaticProps, GetStaticPropsContext } from 'next';
import styles from '@/styles/404.module.css'
import React from 'react';
const Nowork = () => {
  return (
    <>
        <div className={`${styles.transfer} relative`} >
            <div className="bg-blue-500 text-white p-4 mt-28 mb-32 w-3/4 text-center center">
                <h6 className={styles.nw_title}>No Work</h6>
                <p className={styles.nw_description}>We often get told &quot;doesn&apos;t work&quot; &quot;not working&quot;, although that&apos;s not helpful when trying to fix a issue. Instead of saying &quot;doesn&apos;t work&quot;/&quot;not working&quot;:</p>
                <div className={styles.nw_div}>
                    <p>Show your code if you haven&apos;t already.</p>
                    <p>Provide the error message, if any.</p>
                    <p>Explain the exact issue, and share any other context needed.</p>
                </div>

                <p>Thanks!</p>
            </div>
        </div>
    </>
  );
};
  
export default Nowork;
