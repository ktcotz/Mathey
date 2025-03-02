import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../services/services';
import { useToast } from '../../../../ui';
import { UserDetailsID } from '../../../account/queries/useUserDetails';
import { useAuth } from '../../../account/context/useAuth';

export const useUploadAvatar = ({ userID }: UserDetailsID) => {
  const { toast } = useToast();

  const { setupUser } = useAuth();

  const { mutate: uploadingAvatar, isPending: isUploading } = useMutation({
    mutationFn: uploadFile,
    onError: (err) => {
      toast({
        title: 'Problem z uploadem zdjęcia!',
        description: err.message,
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      if (userID) {
        setupUser(userID);
      }

      toast({
        title: 'Zmieniono zdjęcie avatara!',
        description:
          'Pomyślnie zostało zmienione i zaktualizowane twoje zdjęcie profilowe.',
      });
    },
  });

  return { uploadingAvatar, isUploading } as const;
};
