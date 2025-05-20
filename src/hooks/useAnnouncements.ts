import { useState, useEffect } from "react";
import { announcementService, type Announcement } from "@/services/announcements";

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await announcementService.getAllAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch announcements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return { announcements, isLoading, error };
};
