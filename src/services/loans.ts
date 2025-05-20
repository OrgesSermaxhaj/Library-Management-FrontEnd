import api from '@/lib/api';

export interface Loan {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage?: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'overdue' | 'returned' | 'late';
}

// Define the reservation status type to match backend enum
export type ReservationStatus = 'PENDING' | 'APPROVED' | 'CANCELLED' | 'REJECTED' | 'COMPLETED';

export interface Reservation {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage?: string;
  memberId: string;
  memberName: string;
  reservationDate: string;
  expiryDate: string;
  status: ReservationStatus;
}

export const loanService = {
  // Get active loans for the current user
  async getActiveLoans(): Promise<Loan[]> {
    const response = await api.get('/loans/active');
    return response.data;
  },

  // Get loan history for the current user
  async getLoanHistory(): Promise<Loan[]> {
    const response = await api.get('/loans/history');
    return response.data;
  },

  // Return a book
  async returnBook(loanId: string): Promise<void> {
    await api.post(`/loans/${loanId}/return`);
  },

  // Get active reservations for the current user
  async getReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  // Cancel a reservation
  async cancelReservation(reservationId: string): Promise<void> {
    await api.patch(`/reservations/${reservationId}/status?status=CANCELLED`);
  },

  // Create a new reservation
  async createReservation(bookId: string): Promise<Reservation> {
    const response = await api.post('/reservations', { bookId });
    return response.data;
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

  // Handle book pickup - creates a loan and cancels the reservation
  async handleBookPickup(reservationId: string): Promise<void> {
    try {
      // First, create a new loan from the reservation
      const response = await api.post(`/reservations/${reservationId}/checkout`);
      console.log('Checkout response:', response.data);
      
      // Then, cancel the reservation
      await this.updateReservationStatus(reservationId, "CANCELLED");
      
      return response.data;
    } catch (error: any) {
      console.error('Book pickup error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  }
}; 