import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/services';
import { useSwitcher } from '../../../ui';

export const useRegister = () => {
  const { changeForm } = useSwitcher();

  const {
    mutate: register,
    isPaused: isRegistering,
    error: registerError,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      changeForm('login');
    },
  });

  return { register, registerError, isRegistering } as const;
};
