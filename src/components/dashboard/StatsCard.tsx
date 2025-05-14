
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
}

const StatsCard = ({ 
  icon: Icon, 
  title, 
  value,
  iconBgColor = "bg-library-primary",
  iconColor = "text-white"
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <div className={cn("rounded-full p-2", iconBgColor)}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
