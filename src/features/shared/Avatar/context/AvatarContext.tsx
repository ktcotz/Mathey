import { createContext, ReactNode, useState } from 'react';

type AvatarContextState = {
  timestamp: number;
  setCurrentTimestamp: () => void;
};

export const AvatarContext = createContext<AvatarContextState | null>(null);

type AvatarContextProviderProps = {
  children: ReactNode;
};

export const AvatarContextProvider = ({
  children,
}: AvatarContextProviderProps) => {
  const [timestamp, setTimestamp] = useState(Math.random());

  const setCurrentTimestamp = () => {
    setTimestamp(Math.random());
  };

  return (
    <AvatarContext.Provider value={{ timestamp, setCurrentTimestamp }}>
      {children}
    </AvatarContext.Provider>
  );
};
