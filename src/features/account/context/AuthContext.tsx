import { createContext, ReactNode, useState } from 'react';
import { useUserDetails } from '../queries/useUserDetails';
import { User } from '../schemas/UserSchema';

type AuthContextData = {
  user?: User;
  setupUser: (userID: string) => void;
};

export const AuthContext = createContext<AuthContextData | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userID, setUserID] = useState<string | null>(null);
  const { user, refetch } = useUserDetails({ userID });

  const setupUser = (newUserID: string) => {
    setUserID(newUserID);
    refetch();
  };

  return (
    <AuthContext.Provider value={{ user, setupUser }}>
      {children}
    </AuthContext.Provider>
  );
};
