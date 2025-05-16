
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  trend,
  className 
}: StatsCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={
                trend.isPositive 
                  ? "text-green-500 text-xs font-medium"
                  : "text-red-500 text-xs font-medium"
              }>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        <div className="rounded-full p-2 bg-primary/10 text-primary">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
