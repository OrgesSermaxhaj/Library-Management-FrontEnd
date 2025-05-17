
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  Library, 
  History, 
  DollarSign,
  Calendar,
  MessageSquare,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", path: "/member/dashboard", icon: LayoutDashboard },
  { name: "Search Books", path: "/member/search", icon: Search },
  { name: "Browse by Category", path: "/member/categories", icon: BookOpen },
  { name: "My Library Card", path: "/member/card", icon: Library },
  { name: "Loan History", path: "/member/history", icon: History },
  { name: "Fines", path: "/member/fines", icon: DollarSign },
  { name: "Events & News", path: "/member/events", icon: Calendar },
  { name: "Reviews", path: "/member/reviews", icon: MessageSquare },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div 
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!collapsed && <h1 className="text-xl font-bold">Library</h1>}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hidden lg:block"
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                        isActive 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={20} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                © 2025 Library System
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
