import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanService } from '@/services/loans';
import { toast } from 'sonner';

export function useReservations(userId?: number) {
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading, error } = useQuery({
    queryKey: ['reservations', userId],
    queryFn: () => loanService.getReservations(),
    enabled: !!userId,
    retry: 1,
  });

  const cancelReservationMutation = useMutation({
    mutationFn: loanService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation cancelled successfully');
    },
    onError: (error: any) => {
      console.error('Failed to cancel reservation:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel reservation');
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: loanService.createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Book reserved successfully');
    },
    onError: (error: any) => {
      console.error('Failed to reserve book:', error);
      toast.error(error.response?.data?.message || 'Failed to reserve book');
    },
  });

  return {
    reservations,
    isLoading,
    error: error ? (error as any).response?.data?.message || 'Failed to load reservations' : null,
    cancelReservation: cancelReservationMutation.mutate,
    createReservation: createReservationMutation.mutate,
    isCancelling: cancelReservationMutation.isPending,
    isCreating: createReservationMutation.isPending
  };
}
