import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationService, Reservation, ReservationStatus } from '@/services/reservations';
import { loanService } from '@/services/loans';
import { toast } from 'sonner';

const MAX_TOTAL_ITEMS = 5;

export function useReservations() {
  const queryClient = useQueryClient();

  // Get all reservations
  const { data: allReservations = [], isLoading, error } = useQuery<Reservation[]>({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
    refetchInterval: 5000 // Refetch every 5 seconds to keep data fresh
  });

  // Filter out cancelled reservations
  const reservations = allReservations.filter(r => r.status !== 'CANCELLED');

  // Get active loans
  const { data: activeLoans = [] } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
  });

  // Get current number of active reservations
  const getActiveReservationsCount = () => {
    return reservations.filter(r => 
      r.status === 'PENDING' || r.status === 'APPROVED'
    ).length;
  };

  // Get total number of active items (loans + reservations)
  const getTotalActiveItems = () => {
    const activeReservations = getActiveReservationsCount();
    return activeLoans.length + activeReservations;
  };

  // Create a new reservation
  const createReservationMutation = useMutation({
    mutationFn: async (bookId: number) => {
      // Check if user has reached the maximum number of total items
      const totalItems = getTotalActiveItems();
      
      if (totalItems >= MAX_TOTAL_ITEMS) {
        throw new Error(`You can only have ${MAX_TOTAL_ITEMS} total active items (loans + reservations) at a time. You currently have ${totalItems} items.`);
      }

      // Check if the book is available
      const isAvailable = await reservationService.checkAvailability(bookId);
      if (!isAvailable) {
        throw new Error('This book is no longer available');
      }

      return await reservationService.createReservation(bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['books'] }); // Invalidate books query to update quantities
      toast.success('Reservation request submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create reservation');
    }
  });

  // Cancel a reservation
  const cancelReservationMutation = useMutation({
    mutationFn: async (reservationId: number) => {
      await reservationService.cancelReservation(reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['books'] }); // Invalidate books query to update quantities
      toast.success('Reservation cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel reservation');
    }
  });

  // Update reservation status (for librarians)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: number; status: ReservationStatus }) => {
      return await reservationService.updateReservationStatus(reservationId, status);
    },
    onSuccess: (_, variables) => {
      // Invalidate both reservations and books queries to ensure UI is updated
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      
      // Show appropriate success message based on the new status
      if (variables.status === 'APPROVED') {
        toast.success('Reservation approved. Book quantity has been updated.');
      } else if (variables.status === 'REJECTED') {
        toast.success('Reservation rejected.');
      } else if (variables.status === 'CANCELLED') {
        toast.success('Reservation cancelled.');
      } else {
        toast.success('Reservation status updated successfully');
      }
    },
    onError: (error: any) => {
      console.error('Error updating reservation status:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to update reservation status');
    }
  });

  return {
    reservations,
    isLoading,
    error,
    createReservation: createReservationMutation.mutate,
    cancelReservation: cancelReservationMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    isCreating: createReservationMutation.isPending,
    isCancelling: cancelReservationMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    activeReservationsCount: getActiveReservationsCount(),
    totalActiveItems: getTotalActiveItems()
  };
}
