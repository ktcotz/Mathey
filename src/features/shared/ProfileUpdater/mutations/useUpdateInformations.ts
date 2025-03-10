import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInformations } from '../services/services';
import { UserDetailsID } from '../../../account/queries/useUserDetails';
import { useToast } from '../../../../ui';

export const useUpdateInformations = ({ userID }: UserDetailsID) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserInformations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetails', userID] });

      toast({
        variant: 'default',
        title: 'Zaktualizowano profil',
        description:
          'Twój profil został pomyślnie zaktualizowany, nowe dane są już aktualne.',
      });
    },
  });

  return { updateUser, isUpdating } as const;
};
