import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface MemberLayoutProps {
  children: ReactNode;
}

const MemberLayout = ({ children }: MemberLayoutProps) => {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-[250px]">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MemberLayout;
