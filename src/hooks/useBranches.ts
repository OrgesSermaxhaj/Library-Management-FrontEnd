
import { useState, useEffect } from "react";

interface Branch {
  id: string;
  name: string;
  activeLoans: number;
  overdueLoans: number;
  visitorsToday: number;
  status: "Open" | "Closed";
}

export function useBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setBranches([
        {
          id: "B001",
          name: "Main Library",
          activeLoans: 145,
          overdueLoans: 12,
          visitorsToday: 78,
          status: "Open",
        },
        {
          id: "B002",
          name: "North Branch",
          activeLoans: 89,
          overdueLoans: 5,
          visitorsToday: 42,
          status: "Open",
        },
        {
          id: "B003",
          name: "East Wing",
          activeLoans: 56,
          overdueLoans: 0,
          visitorsToday: 31,
          status: "Open",
        },
        {
          id: "B004",
          name: "South Campus",
          activeLoans: 0,
          overdueLoans: 0,
          visitorsToday: 0,
          status: "Closed",
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { branches, isLoading };
}
