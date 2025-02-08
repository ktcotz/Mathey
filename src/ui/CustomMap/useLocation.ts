import { useMutation } from '@tanstack/react-query';
import { getMyLocation } from './services/services';
import { useToast } from '../hooks/use-toast';
import { MapPosition } from './CustomMap';

export const useLocation = () => {
  const { toast } = useToast();

  const {
    mutate: getLocation,
    isPending: isLoading,
    error: locationError,
    data: position,
  } = useMutation<MapPosition>({
    mutationFn: getMyLocation,
    onError: (err) => {
      toast({
        title: 'Problem z pobraniem lokalizacji',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  return { getLocation, isLoading, locationError, position } as const;
};
