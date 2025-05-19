
import { ReactNode } from "react";
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
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
