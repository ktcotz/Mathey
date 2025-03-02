import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../services/services';

export type UserDetailsID = {
  userID: string | null;
};

export const useUserDetails = ({ userID }: UserDetailsID) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['userDetails', userID],
    queryFn: () => getUserDetails({ userID }),
    enabled: !!userID,
  });

  return { user, isLoading, refetch } as const;
};
