import { createContext, ReactNode, useState } from 'react';

const forms = ['login', 'register', 'forgot', 'change'] as const;
export type Forms = (typeof forms)[number];

type SwitcherContextData = {
  currentForm: Forms;
  changeForm: (form: string) => void;
};

export const SwitcherContext = createContext<SwitcherContextData | null>(null);

type SwitcherContextProviderProps = {
  children: ReactNode;
};

const isValidForm = (form: string): form is Forms => {
  return (forms as readonly string[]).includes(form);
};

export const SwitcherContextProvider = ({
  children,
}: SwitcherContextProviderProps) => {
  const [currentForm, setCurrentForm] = useState<Forms>('login');

  const changeForm = (form: string) => {
    if (!isValidForm(form)) return;

    setCurrentForm(form);
  };

  return (
    <SwitcherContext.Provider value={{ currentForm, changeForm }}>
      {children}
    </SwitcherContext.Provider>
  );
};
