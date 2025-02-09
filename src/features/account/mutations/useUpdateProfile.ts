import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../services/services';
import { UserDetailsID } from '../queries/useUserDetails';
import { useToast } from '../../../ui';

export const useUpdateProfile = ({ userID }: UserDetailsID) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast({
        title: 'Pomyślnie zaktualizowano profil',
        description:
          'Twój profil właśnie został zaktualizowany, możesz także później wprowadzać zmiany',
      });
      queryClient.invalidateQueries({ queryKey: ['userDetails', userID] });
    },
    onError: (err) => {
      toast({
        title: 'Problem z aktualizacją profilu',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { updateProfile, isUpdating } as const;
};
