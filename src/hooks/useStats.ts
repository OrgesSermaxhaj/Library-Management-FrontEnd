import { useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import { useBooks } from "./useBooks";
import { useQuery } from "@tanstack/react-query";
import { loanService } from "@/services/loans";
import { reservationService } from "@/services/reservations";
import { isAfter, parseISO } from "date-fns";

interface StatsData {
  totalUsers: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  activeLoans: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  overdueBooks: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  totalFines: {
    value: string;
    trend: { value: number; isPositive: boolean };
  };
  totalBooks: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  activeMembers: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  booksReserved: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  overdueReturns: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useUsers();
  const { books } = useBooks();

  // Fetch active loans
  const { data: activeLoans = [] } = useQuery({
    queryKey: ['activeLoans'],
    queryFn: loanService.getActiveLoans,
  });

  // Fetch reservations
  const { data: reservations = [] } = useQuery({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
  });

  useEffect(() => {
    if (users && books && activeLoans && reservations) {
      // Calculate total users
      const totalUsers = users.length;
      
      // Calculate total books
      const totalBooks = books.length;
      
      // Calculate active members (users with role MEMBER)
      const activeMembers = users.filter(user => user.role === "MEMBER").length;

      // Calculate overdue loans
      const overdueLoans = activeLoans.filter(loan => {
        const dueDate = parseISO(loan.dueDate);
        return isAfter(new Date(), dueDate);
      });

      // Calculate pending reservations
      const pendingReservations = reservations.filter(r => 
        r.status === 'PENDING' || r.status === 'APPROVED'
      );

      setStats({
        totalUsers: {
          value: totalUsers,
          trend: { value: 0, isPositive: true }
        },
        activeLoans: {
          value: activeLoans.length,
          trend: { value: 0, isPositive: true }
        },
        overdueBooks: {
          value: overdueLoans.length,
          trend: { value: 0, isPositive: false }
        },
        totalFines: {
          value: "$0.00",
          trend: { value: 0, isPositive: true }
        },
        totalBooks: {
          value: totalBooks,
          trend: { value: 0, isPositive: true }
        },
        activeMembers: {
          value: activeMembers,
          trend: { value: 0, isPositive: true }
        },
        booksReserved: {
          value: pendingReservations.length,
          trend: { value: 0, isPositive: true }
        },
        overdueReturns: {
          value: overdueLoans.length,
          trend: { value: 0, isPositive: false }
        }
      });
      setIsLoading(false);
    }
  }, [users, books, activeLoans, reservations]);

  return { stats, isLoading };
}
