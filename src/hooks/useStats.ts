
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
        }
      });
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading };
}
