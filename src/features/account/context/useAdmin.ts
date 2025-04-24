import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAdmin = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Can't use Auth Context without provider!");
  }
  return context;
};
