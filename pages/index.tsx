// @/pages/index.tsx
import { GetStaticProps, GetStaticPropsContext } from 'next';
import '@/public/assets/css/styles.css';
import StaffMembers from '../components/interface/members';
import staffData from '@/data/Members.json';
import { Staff, Member } from '@/types/index';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

// Function to ensure userID is a number
const parseMembers = (data: any): Staff => {
  const parseMember = (member: any): Member => ({
    ...member,
    userID: typeof member.userID === 'string' ? parseInt(member.userID, 10) : member.userID,
  });

  return {
    developer: data.developer.map(parseMember),
    communityManager: data.communityManager.map(parseMember),
    member: data.member.map(parseMember),
  };
};

const Home = () => {
  const { t } = useTranslation('common');
  const staff: Staff = parseMembers(staffData[0]);
  
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