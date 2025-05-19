
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Building2, 
  Settings,
  FileText,
  BellRing,
  Menu,
  X,
  ShieldAlert
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Management", path: "/admin/users", icon: Users },
  { name: "Book Management", path: "/admin/books", icon: BookOpen },
  { name: "Branch Management", path: "/admin/branches", icon: Building2 },
  { name: "System Settings", path: "/admin/settings", icon: Settings },
  { name: "Reports & Logs", path: "/admin/reports", icon: FileText },
  { name: "Announcements", path: "/admin/announcements", icon: BellRing },
];

const AdminSidebar = () => {
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
          "fixed top-0 left-0 h-full z-40 transition-all duration-300 bg-gray-900 shadow-lg",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && (
              <div className="flex items-center">
                <ShieldAlert className="h-6 w-6 mr-2 text-red-500" />
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              </div>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md text-white hover:bg-gray-800 hidden lg:block"
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
                          ? "bg-red-900 text-white" 
                          : "text-gray-300 hover:bg-gray-800"
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
          <div className="p-4 border-t border-gray-800">
            {!collapsed && (
              <div className="text-xs text-gray-500">
                © 2025 Admin System
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
