import api from '@/lib/api';

export interface Reservation {
  id: number;
  bookId: number;
  title: string;
  authorName: string;
  userId: number;
  userFullName: string;
  loanDate: string;
  dueDate: string;
  status: string;
}

export type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

export const reservationService = {
  // Get all reservations for the current user
  async getReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  // Create a new reservation
  async createReservation(bookId: number): Promise<Reservation> {
    // Only check availability using /check/{bookId}
    const isAvailable = await this.checkAvailability(bookId);
    if (!isAvailable) {
      throw new Error('This book is no longer available');
    }

    const response = await api.post('/reservations', {
      bookId,
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returned: false,
      status: 'PENDING'
    });
    return response.data;
  },

  // Cancel a reservation
  async cancelReservation(reservationId: number): Promise<void> {
    await api.delete(`/reservations/${reservationId}`);
  },

  // Update reservation status (for librarians)
  async updateReservationStatus(reservationId: number, status: ReservationStatus): Promise<Reservation> {
    const response = await api.patch(`/reservations/${reservationId}/status?status=${status}`);
    return response.data;
  },

  // Check book availability using only /check/{bookId}
  async checkAvailability(bookId: number): Promise<boolean> {
    try {
      const response = await api.get(`/reservations/check/${bookId}`);
      return response.data.available;
    } catch (error) {
      console.error('Error checking book availability:', error);
      return false;
    }
  },

  // Get user's active reservations count
  async getUserActiveReservationsCount(): Promise<number> {
    const response = await api.get('/reservations/count/active');
    return response.data.count;
  },

  // Confirm pickup (librarian marks reservation as picked up)
  async confirmPickup(reservationId: number): Promise<any> {
    const response = await api.patch(`/reservations/${reservationId}/pickup`);
    return response.data;
  }
};