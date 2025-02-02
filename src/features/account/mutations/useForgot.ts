import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../services/services';

export const useForgot = () => {
  const {
    mutate: forgot,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: forgotPassword,
  });

  return { forgot, isLoading, isError } as const;
};
