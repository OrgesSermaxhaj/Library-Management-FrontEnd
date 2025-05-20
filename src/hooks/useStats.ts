import { useState, useEffect } from "react";
import { useUsers } from "./useUsers";
import { useBooks } from "./useBooks";

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
  issuesReported: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  overdueLoans: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
}

export function useStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useUsers();
  const { books } = useBooks();

  useEffect(() => {
    if (users && books) {
      // Calculate total users
      const totalUsers = users.length;
      
      // Calculate total books
      const totalBooks = books.length;
      
      // Calculate active members (users with role MEMBER)
      const activeMembers = users.filter(user => user.role === "MEMBER").length;

      setStats({
        totalUsers: {
          value: totalUsers,
          trend: { value: 0, isPositive: true } // We don't have historical data for trend
        },
        activeLoans: {
          value: 0, // We'll need to implement this
          trend: { value: 0, isPositive: true }
        },
        overdueBooks: {
          value: 0, // We'll need to implement this
          trend: { value: 0, isPositive: false }
        },
        totalFines: {
          value: "$0.00", // We'll need to implement this
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
        issuesReported: {
          value: 0, // We'll need to implement this
          trend: { value: 0, isPositive: false }
        },
        overdueLoans: {
          value: 0, // We'll need to implement this
          trend: { value: 0, isPositive: false }
        }
      });
      setIsLoading(false);
    }
  }, [users, books]);

  return { stats, isLoading };
}
