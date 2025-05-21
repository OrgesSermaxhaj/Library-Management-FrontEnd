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

export type ReservationStatus = 'PENDING' | 'APPROVED' | 'CANCELLED' | 'REJECTED' | 'COMPLETED';

export const reservationService = {
  // Get all reservations for the current user
  async getReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  // Create a new reservation
  async createReservation(bookId: number): Promise<Reservation> {
    console.log('Creating reservation for bookId:', bookId);
    try {
      // Get the current user's ID from the stored user object
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error('User not found');
      }

      const user = JSON.parse(storedUser);
      if (!user.id) {
        throw new Error('User ID not found');
      }

      // Create the reservation DTO matching the backend's structure
      const reservationDto = {
        bookId: bookId,
        userId: user.id,
        loanDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        returned: false,
        status: 'PENDING'
      };

      console.log('Sending reservation DTO:', reservationDto);
      const response = await api.post('/reservations', reservationDto);
      console.log('Reservation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Cancel a reservation
  async cancelReservation(id: number): Promise<void> {
    await api.delete(`/reservations/${id}`);
  },

  // Update reservation status
  async updateReservationStatus(reservationId: string, status: ReservationStatus): Promise<void> {
    console.log('Sending update request:', { reservationId, status });
    try {
      const url = `/reservations/${reservationId}/status?status=${encodeURIComponent(status)}`;
      
      // Log the full request details
      console.log('Request details:', {
        url,
        method: 'PATCH',
        status,
        token: localStorage.getItem('token'),
        tenantId: localStorage.getItem('tenantId')
      });

      // Send the request with explicit method
      const response = await api({
        method: 'PATCH',
        url,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Update response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Status update error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        headers: error.response?.headers,
        request: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      throw error;
    }
  },

  // Check book availability
  async checkAvailability(bookId: number): Promise<boolean> {
    const response = await api.get(`/reservations/check/${bookId}`);
    return response.data.available;
  },

  // Get user's active reservations count
  async getUserActiveReservationsCount(): Promise<number> {
    const response = await api.get('/reservations/count/active');
    return response.data.count;
  }
};