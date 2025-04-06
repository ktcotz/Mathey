import { useContext } from 'react';
import { AccountLevelContext } from './AccountContext';

export const useAccountLevel = () => {
  const context = useContext(AccountLevelContext);

  if (context === null) {
    throw new Error("Can't use an account level context without provider!");
  }

  return context;
};
