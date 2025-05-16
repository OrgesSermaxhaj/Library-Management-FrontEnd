
import { useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  status: "Up" | "Down";
  lastChecked: string;
}

export function useServiceStatus() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setServices([
        {
          id: "s1",
          name: "API Gateway",
          status: "Up",
          lastChecked: "1 min ago",
        },
        {
          id: "s2",
          name: "Authentication Service",
          status: "Up",
          lastChecked: "1 min ago",
        },
        {
          id: "s3",
          name: "Database Cluster",
          status: "Up",
          lastChecked: "1 min ago",
        },
        {
          id: "s4",
          name: "SMS Notification Service",
          status: "Down",
          lastChecked: "3 min ago",
        },
        {
          id: "s5",
          name: "Email Service",
          status: "Up",
          lastChecked: "1 min ago",
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { services, isLoading };
}
