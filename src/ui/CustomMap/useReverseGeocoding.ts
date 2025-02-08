import { useMutation } from '@tanstack/react-query';
import { reverseGeocoding } from './services/services';
import { useToast } from '../hooks/use-toast';

export const useReverseGeocoding = () => {
  const { toast } = useToast();

  const {
    mutate: reverse,
    isPending: isLoading,
    error: locationError,
    data: informations,
  } = useMutation({
    mutationFn: reverseGeocoding,
    onError: (err) => {
      toast({
        title: 'Problem z pobraniem lokalizacji',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { reverse, isLoading, locationError, informations } as const;
};
