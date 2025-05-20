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

export interface Reservation {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage?: string;
  reservationDate: string;
  expiryDate: string;
  status: 'pending' | 'ready' | 'canceled' | 'expired';
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
    await api.delete(`/reservations/${reservationId}`);
  },

  // Create a new reservation
  async createReservation(bookId: string): Promise<Reservation> {
    const response = await api.post('/reservations', { bookId });
    return response.data;
  }
}; 