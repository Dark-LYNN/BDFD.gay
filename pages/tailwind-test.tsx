// pages/tailwind-test.tsx
import { GetStaticProps, GetStaticPropsContext } from 'next';
import styles from '@/styles/404.module.css'
import React from 'react';
import Link from 'next/link';
const TailwindExamplePage = () => {
  return (
    <>
        <div className={`${styles.transfer} relative`} >
            <div className="bg-blue-500 text-white p-4 mt-28 mb-32 w-3/4 text-center center">
                <h1 className="text-3xl font-bold">Tailwind CSS Example</h1>
                <p className=" pb-4 text-lg">This is a to see if Tailwind CSS is working</p>
                <Link  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" href='/'>Click Me</Link>
            </div>
        </div>
    </>
  );
};
  
export default TailwindExamplePage;
