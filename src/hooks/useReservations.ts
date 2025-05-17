
import { useState, useEffect } from 'react';

export interface Reservation {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  position: number;
  estimatedAvailability: string;
}

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchReservations = () => {
      setIsLoading(true);
      
      // Dummy data
      setTimeout(() => {
        const dummyReservations: Reservation[] = [
          {
            id: "res-1",
            title: "Fourth Wing",
            author: "Rebecca Yarros",
            coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=100",
            position: 1,
            estimatedAvailability: "2025-05-20"
          },
          {
            id: "res-2",
            title: "The Wager",
            author: "David Grann",
            coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100",
            position: 3,
            estimatedAvailability: "2025-05-28"
          }
        ];
        
        setReservations(dummyReservations);
        setIsLoading(false);
        setError(null);
      }, 500);
    };
    
    fetchReservations();
  }, []);
  
  const cancelReservation = (reservationId: string) => {
    setReservations(prevReservations => 
      prevReservations.filter(reservation => reservation.id !== reservationId)
    );
  };
  
  return { reservations, isLoading, error, cancelReservation };
}
