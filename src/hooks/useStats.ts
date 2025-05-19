
import { useState, useEffect } from "react";

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
  // Add missing properties for Librarian and Admin dashboards
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

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setStats({
        totalUsers: {
          value: 5842,
          trend: { value: 12, isPositive: true }
        },
        activeLoans: {
          value: 783,
          trend: { value: 8, isPositive: true }
        },
        overdueBooks: {
          value: 42,
          trend: { value: 3, isPositive: false }
        },
        totalFines: {
          value: "$1,245.50",
          trend: { value: 5, isPositive: true }
        },
        // Add dummy data for the new properties
        totalBooks: {
          value: 12489,
          trend: { value: 3.2, isPositive: true }
        },
        activeMembers: {
          value: 2341,
          trend: { value: 5.1, isPositive: true }
        },
        issuesReported: {
          value: 7,
          trend: { value: 2.3, isPositive: false }
        },
        overdueLoans: {
          value: 38,
          trend: { value: 4.2, isPositive: false }
        }
      });
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading };
}
