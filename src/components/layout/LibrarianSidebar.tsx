
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Bell, 
  Users, 
  PenSquare,
  Menu,
  X,
  LibraryBig
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", path: "/librarian/dashboard", icon: LayoutDashboard },
  { name: "Book Inventory", path: "/librarian/inventory", icon: BookOpen },
  { name: "Loan Management", path: "/librarian/loans", icon: LibraryBig },
  { name: "Reservations", path: "/librarian/reservations", icon: Calendar },
  { name: "Notifications", path: "/librarian/notifications", icon: Bell },
  { name: "Member Profiles", path: "/librarian/members", icon: Users },
  { name: "Announcements", path: "/librarian/announcements", icon: PenSquare },
];

const LibrarianSidebar = () => {
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
          "fixed top-0 left-0 h-full z-40 transition-all duration-300 bg-blue-600 dark:bg-gray-800 shadow-lg",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-700 dark:border-gray-700">
            {!collapsed && <h1 className="text-xl font-bold text-white">Library Admin</h1>}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md text-white hover:bg-blue-700 dark:hover:bg-gray-700 hidden lg:block"
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
                          ? "bg-blue-700 text-white dark:bg-blue-900 dark:text-white" 
                          : "text-white hover:bg-blue-700/70 dark:hover:bg-gray-700"
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
          <div className="p-4 border-t border-blue-700 dark:border-gray-700">
            {!collapsed && (
              <div className="text-xs text-blue-100 dark:text-gray-400">
                © 2025 Library System
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrarianSidebar;
