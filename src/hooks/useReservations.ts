import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanService, Reservation } from '@/services/loans';
import { toast } from 'sonner';

export { type Reservation } from '@/services/loans';

export function useReservations() {
  const queryClient = useQueryClient();

  const { data: reservations = [], isLoading, error } = useQuery({
    queryKey: ['reservations'],
    queryFn: loanService.getReservations
  });

  const cancelReservation = useMutation({
    mutationFn: (reservationId: string) => loanService.cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation canceled successfully');
    },
    onError: (error) => {
      toast.error('Failed to cancel reservation');
      console.error('Cancel reservation error:', error);
    }
  });

  return {
    reservations,
    isLoading,
    error: error ? 'Failed to load reservations' : null,
    cancelReservation: cancelReservation.mutate
  };
}
