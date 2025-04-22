import { useQuery } from '@tanstack/react-query';
import { getAllSubjects } from '../services/services';
import { User } from '../../../account/schemas/UserSchema';

export const useGetAllSubjects = (user: User) => {
  const { data, isLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getAllSubjects(user),
  });

  return { data, isLoading } as const;
};
