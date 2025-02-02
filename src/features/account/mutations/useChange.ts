import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/services';

export const useChange = () => {
  const { mutate: change, isPending: isChanging } = useMutation({
    mutationFn: changePassword,
  });

  return { change, isChanging } as const;
};
