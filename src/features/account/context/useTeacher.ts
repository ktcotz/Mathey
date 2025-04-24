import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Teacher } from '../schemas/UserSchema';

export const useTeacher = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Can't use Auth Context without provider!");
  }

  return { ...context, user: context.user as Teacher };
};
