import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogout } from '../services/services';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../../types/shared';
import { useToast } from '../../../ui';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    mutate: logout,
    isPending: isLogout,
    error: logoutError,
  } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      navigate(AppRoutes.Home);
      queryClient.setQueriesData(
        {
          queryKey: ['user'],
        },
        null,
      );
    },

    onError: (err) => {
      toast({
        title: 'Problem z wylogowywaniem',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { logout, isLogout, logoutError } as const;
};
