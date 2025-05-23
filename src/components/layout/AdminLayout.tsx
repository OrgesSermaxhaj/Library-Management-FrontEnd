import { ReactNode, useState } from "react";
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar onCollapseChange={setSidebarCollapsed} />
        <div className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          sidebarCollapsed ? "lg:ml-[80px]" : "lg:ml-[220px]"
        )}>
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
