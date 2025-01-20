import { AnimatePresence, motion } from 'motion/react';
import { LoginForm, RegisterForm, ForgotForm } from '../features/account';
import {
  BackgroundDecoration,
  Forms,
  FormSwitcher,
  Logo,
  useSwitcher,
} from '../ui';

import { ElementType } from 'react';
import { homeSwitcher } from '../ui/FormSwitcher/data/switcher';

const forms: Record<Forms, ElementType> = {
  login: LoginForm,
  forgot: ForgotForm,
  register: RegisterForm,
};

export const Home = () => {
  const { currentForm } = useSwitcher();

  const Form = forms[currentForm];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <BackgroundDecoration />
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <Logo />
          <h1 className="mb-6 text-center text-3xl font-bold">
            Korepetycje z{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Matematyki
            </span>
          </h1>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-xl">
          <FormSwitcher data={homeSwitcher} />
          <div className="h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentForm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Form />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
