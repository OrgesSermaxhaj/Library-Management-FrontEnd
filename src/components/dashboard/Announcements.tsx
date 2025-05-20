import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Announcements = () => {
  const { announcements, isLoading, error } = useAnnouncements();
  const navigate = useNavigate();

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "No date";
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const handleNewAnnouncement = () => {
    navigate('/admin/announcements');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Announcements</h3>
        <Button size="sm" className="flex items-center gap-1" onClick={handleNewAnnouncement}>
          <PlusCircle size={16} />
          <span>New</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          {error}
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No announcements found
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {formatDate(announcement.publishDate)}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{announcement.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
