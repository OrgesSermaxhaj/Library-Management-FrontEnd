
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Announcements = () => {
  const { announcements, isLoading } = useAnnouncements();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Announcements</h3>
        <Button size="sm" className="flex items-center gap-1">
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
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{announcement.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{announcement.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
