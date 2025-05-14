
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface HeaderProps {
  title: string;
  showFilterOptions?: boolean;
  showMemberDetails?: boolean;
  onCloseMemberDetails?: () => void;
}

const Header = ({ 
  title, 
  showFilterOptions = false, 
  showMemberDetails = false,
  onCloseMemberDetails 
}: HeaderProps) => {
  const [timeFilter, setTimeFilter] = useState("weekly");
  
  return (
    <div className="flex justify-between items-center pb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center">
        {showFilterOptions && (
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {showMemberDetails && (
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-2">Quick reviews</h2>
            <button 
              onClick={onCloseMemberDetails}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
