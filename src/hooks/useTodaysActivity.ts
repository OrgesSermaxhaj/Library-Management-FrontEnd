
import { useState, useEffect } from "react";

interface Activity {
  id: string;
  description: string;
  time: string;
  type: "due" | "reservation" | "fine";
}

export const useTodaysActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        const dummyActivities: Activity[] = [
          {
            id: "act1",
            description: "Harry Potter and the Chamber of Secrets due today",
            time: "10:30 AM",
            type: "due"
          },
          {
            id: "act2",
            description: "New reservation: The Great Gatsby by John Smith",
            time: "9:15 AM",
            type: "reservation"
          },
          {
            id: "act3",
            description: "Apply fine ($2.50) to member #1234",
            time: "Yesterday",
            type: "fine"
          },
          {
            id: "act4",
            description: "To Kill a Mockingbird due tomorrow",
            time: "Yesterday",
            type: "due"
          },
          {
            id: "act5",
            description: "New reservation: 1984 by Sarah Johnson",
            time: "Yesterday",
            type: "reservation"
          }
        ];
        
        setActivities(dummyActivities);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 500);
  }, []);

  return { activities, isLoading, error };
};
