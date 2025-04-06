import { useMutation, useQueryClient } from '@tanstack/react-query';
import { awardXP } from '../services/services';
import { UserDetailsID } from '../../../queries';
import { useAccountLevel } from '../context/useAccountLevel';
import { useToast } from '../../../../../ui';

export const useManageUserLevel = ({ userID }: UserDetailsID) => {
  const queryClient = useQueryClient();
  const { manageLeveling } = useAccountLevel();
  const { toast } = useToast();

  const { mutate: userAwardXP, isPending: isLoading } = useMutation({
    mutationFn: awardXP,

    onSuccess: (data) => {
      if (data.isLeveled) {
        manageLeveling(true);

        toast({
          title: 'Następny poziom konta!',
          description:
            'Twój poziom konta właśnie się zwiększył, w ustawieniach konta zobacz jakie przysługują Ci za to udogodnienia w naszym serwisie!',
        });

        setTimeout(() => {
          manageLeveling(false);
        }, 3500);
      }

      queryClient.invalidateQueries({ queryKey: ['userDetails', userID] });
    },
  });

  return { userAwardXP, isLoading } as const;
};
