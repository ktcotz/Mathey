import { useContext } from 'react';
import { SwitcherContext } from './SwitcherContext';

export const useSwitcher = () => {
  const context = useContext(SwitcherContext);

  if (context === null) {
    throw new Error("Can't use Switcher Context without own provider!");
  }

  return context;
};
