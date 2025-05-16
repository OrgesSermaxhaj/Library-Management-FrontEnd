
import { useState, useEffect } from "react";

interface VisitorsData {
  date: string;
  visitors: number;
  borrowers: number;
}

export function useVisitorsData() {
  const [data, setData] = useState<VisitorsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const today = new Date();
      const data = [];

      // Generate last 7 days of data
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        
        data.push({
          date: `${day} ${month}`,
          visitors: Math.floor(Math.random() * 60) + 40,
          borrowers: Math.floor(Math.random() * 30) + 20,
        });
      }
      
      setData(data);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}
