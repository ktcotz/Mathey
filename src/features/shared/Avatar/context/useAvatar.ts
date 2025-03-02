import { useContext } from 'react';
import { AvatarContext } from './AvatarContext';

export const useAvatar = () => {
  const context = useContext(AvatarContext);

  if (context === null) {
    throw new Error("Can't use Avatar Context without provider!");
  }

  return context;
};
