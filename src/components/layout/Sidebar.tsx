
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { BookOpenText, Users, Library, BarChart4, HelpCircle, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart4 },
  { name: "Library Loan", path: "/loans", icon: Library },
  { name: "Books", path: "/books", icon: BookOpenText },
  { name: "Members", path: "/members", icon: Users },
];

const bottomNavItems = [
  { name: "Help", path: "/help", icon: HelpCircle },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-screen bg-library-primary text-white flex flex-col w-[250px] min-w-[250px] border-r border-library-border">
      <div className="flex items-center gap-2 p-4 mb-4">
        <div className="w-8 h-8">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M18 36L0 27V9L18 0L36 9V27L18 36Z" fill="white" />
            <path d="M18 18L0 9L18 0L36 9L18 18Z" fill="#4246F3" />
            <path d="M18 36V18L36 9V27L18 36Z" fill="#3639BE" />
            <path d="M18 36V18L0 9V27L18 36Z" fill="#6568F8" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">librarian.io</h1>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">John Doe</span>
            <span className="text-xs opacity-80">Librarian</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-3">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn("sidebar-link", isActive && "active")}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto px-3 mb-6">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn("sidebar-link", isActive && "active")}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
