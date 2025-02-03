import { useContext } from 'react';
import { StepperContext } from './StepperContext';

export const useStepper = () => {
  const context = useContext(StepperContext);

  if (context === null) {
    throw new Error("Can't use Stepper Context without provider!");
  }

  return context;
};
