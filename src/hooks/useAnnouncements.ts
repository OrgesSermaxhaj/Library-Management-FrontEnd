
import { useState, useEffect } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setAnnouncements([
        {
          id: "a1",
          title: "System Maintenance",
          content: "The system will be undergoing maintenance this weekend. Please expect some downtime between 2-4 AM.",
          date: "Today, 10:23 AM",
          author: "System Admin",
        },
        {
          id: "a2",
          title: "New Book Collection",
          content: "The new collection of science fiction books has arrived and is ready for processing.",
          date: "Yesterday, 3:45 PM",
          author: "Collection Manager",
        },
        {
          id: "a3",
          title: "Staff Meeting",
          content: "Reminder: Monthly staff meeting this Friday at 2 PM in the conference room.",
          date: "May 15, 2025",
          author: "HR Department",
        },
      ]);
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return { announcements, isLoading };
}
