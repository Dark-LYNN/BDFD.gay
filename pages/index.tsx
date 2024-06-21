// @/pages/index.tsx
import { GetStaticProps, GetStaticPropsContext } from 'next';
import '@/public/assets/css/styles.css';
import StaffMembers from '../components/interface/members';
import staffData from '@/data/Members.json';
import { Staff } from '@/types/index';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('common');
  const staff: Staff = staffData[0];

  return (
    <>
      <StaffMembers staff={staff} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;