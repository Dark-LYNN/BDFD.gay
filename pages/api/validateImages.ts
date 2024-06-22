import axios from 'axios';
import { Staff, Member } from '@/types'; // Adjust the import path according to your project structure

const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const validateStaffImages = async (staff: Staff) => {
  const validateAndReplace = async (member: Member) => {
    const isValid = await validateImageUrl(member.image);
    if (!isValid) {
      member.image = '/assets/images/default-avatar.png';
    }
  };

  const validationPromises = [
    ...staff.developer.map(validateAndReplace),
    ...staff.communityManager.map(validateAndReplace),
    ...staff.toaster.map(validateAndReplace),
    ...staff.moderator.map(validateAndReplace),
    ...staff.member.map(validateAndReplace),
  ];

  await Promise.all(validationPromises);
  return staff;
};
