
import { Button } from "@/components/ui/button";
import { ArrowUpToLine, Send } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex items-center gap-2 w-full">
          <ArrowUpToLine size={16} />
          <span>Export Reports</span>
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <Send size={16} />
          <span>Send Notification</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
