import { useState, useEffect } from 'react';

export interface StatsData {
  totalBooks: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  activeMembers: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  overdueLoans: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
  issuesReported: {
    value: number;
    trend: { value: number; isPositive: boolean };
  };
}

export const useStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Using mock data temporarily since we don't have access to the real endpoints yet
        const mockStats: StatsData = {
          totalBooks: {
            value: 150,
            trend: { value: 5, isPositive: true }
          },
          activeMembers: {
            value: 45,
            trend: { value: 2, isPositive: true }
          },
          overdueLoans: {
            value: 12,
            trend: { value: 3, isPositive: false }
          },
          issuesReported: {
            value: 3,
            trend: { value: 1, isPositive: false }
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStats(mockStats);
      } catch (err) {
        setError('Failed to fetch dashboard statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
