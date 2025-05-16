
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GitBranch, 
  Settings, 
  BarChartHorizontal, 
  Bell,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "User Management", path: "/users", icon: Users },
  { name: "Book Management", path: "/books", icon: BookOpen },
  { name: "Branch Management", path: "/branches", icon: GitBranch },
  { name: "System Settings", path: "/settings", icon: Settings },
  { name: "Reports", path: "/reports", icon: BarChartHorizontal },
  { name: "Announcements", path: "/announcements", icon: Bell },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div 
      className={cn(
        "bg-library-primary text-white flex flex-col border-r border-library-border relative transition-all duration-300",
        collapsed ? "w-[70px] min-w-[70px]" : "w-[250px] min-w-[250px]"
      )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-16 bg-white text-library-primary border border-gray-200 rounded-full z-20 shadow-md hover:bg-gray-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>

      <div className={cn(
        "flex items-center gap-2 p-4 mb-4",
        collapsed && "justify-center"
      )}>
        <div className="w-8 h-8 flex-shrink-0">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M18 36L0 27V9L18 0L36 9V27L18 36Z" fill="white" />
            <path d="M18 18L0 9L18 0L36 9L18 18Z" fill="#4246F3" />
            <path d="M18 36V18L36 9V27L18 36Z" fill="#3639BE" />
            <path d="M18 36V18L0 9V27L18 36Z" fill="#6568F8" />
          </svg>
        </div>
        {!collapsed && (
          <h1 className="text-xl font-bold">librarian.io</h1>
        )}
      </div>
      
      {!collapsed && (
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">John Doe</span>
              <span className="text-xs opacity-80">Admin</span>
            </div>
          </div>
        </div>
      )}
      
      <nav className={cn(
        "flex-1 px-3",
        collapsed && "px-2"
      )}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 my-1 text-sm rounded-md transition-colors hover:bg-sidebar-accent",
                collapsed && "justify-center px-2",
                isActive && "bg-sidebar-accent"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className={cn(
        "mt-auto px-3 mb-6",
        collapsed && "px-2"
      )}>
        <Link
          to="/help"
          className={cn(
            "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Help & Support" : undefined}
        >
          <Settings size={20} />
          {!collapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
