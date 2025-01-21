import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogin } from '../services/services';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLogin,
    error: loginError,
  } = useMutation({
    mutationFn: userLogin,
    onSuccess: (user) => {
      queryClient.setQueriesData(
        {
          queryKey: ['user'],
        },
        user.user,
      );
    },
  });

  return { login, isLogin, loginError } as const;
};
