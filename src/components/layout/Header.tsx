
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, User, LogOut, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifications] = useState(3);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex-1 min-w-0 flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 truncate">
            librarian.io <span className="text-sm font-normal text-gray-500 dark:text-gray-400 hidden sm:inline-block">Admin Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">admin@librarian.io</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/login")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
