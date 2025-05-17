
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import LibrarianSidebar from "@/components/layout/LibrarianSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface LibrarianLayoutProps {
  children: ReactNode;
}

const LibrarianLayout = ({ children }: LibrarianLayoutProps) => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <LibrarianSidebar />
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

export default LibrarianLayout;
