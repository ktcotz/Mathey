import { createContext, ReactNode, useState } from 'react';

type StepperContextData = {
  step: number;
  nextStep: () => void;
  previousStep: () => void;
};

export const StepperContext = createContext<StepperContextData | null>(null);

type StepperContextProviderProps = {
  children: ReactNode;
  maxStep: number;
};

export const StepperContextProvider = ({
  children,
  maxStep,
}: StepperContextProviderProps) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step >= maxStep) return;

    setStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    if (step === 1) return;

    setStep((prevStep) => prevStep - 1);
  };

  return (
    <StepperContext.Provider value={{ step, nextStep, previousStep }}>
      {children}
    </StepperContext.Provider>
  );
};
