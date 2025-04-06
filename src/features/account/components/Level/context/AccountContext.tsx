import { createContext, ReactNode, useState } from 'react';

type AccountLevelContextState = {
  isLevelingUp: boolean;
  manageLeveling: (state: boolean) => void;
};

export const AccountLevelContext =
  createContext<AccountLevelContextState | null>(null);

type AccountLevelContextProviderProps = {
  children: ReactNode;
};

export const AccountLevelContextProvider = ({
  children,
}: AccountLevelContextProviderProps) => {
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const manageLeveling = (state: boolean) => {
    setIsLevelingUp(state);
  };

  return (
    <AccountLevelContext.Provider value={{ isLevelingUp, manageLeveling }}>
      {children}
    </AccountLevelContext.Provider>
  );
};
