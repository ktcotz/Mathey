import { createContext, ReactNode, useState } from 'react';
import { useUserDetails } from '../queries/useUserDetails';
import { GeneralUser, Role } from '../schemas/UserSchema';

type AuthContextData = {
  user?: GeneralUser;
  role?: Role;
  setupUser: (userID: string) => void;
};

export const AuthContext = createContext<AuthContextData | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userID, setUserID] = useState<string | null>(null);
  const { user } = useUserDetails({ userID });

  const setupUser = (newUserID: string) => {
    setUserID(newUserID);
  };

  return (
    <AuthContext.Provider value={{ user, setupUser, role: user?.type }}>
      {children}
    </AuthContext.Provider>
  );
};
