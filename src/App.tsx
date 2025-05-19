
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Admin dashboard routes
import AdminDashboard from "./pages/Admin/Dashboard";

// Member dashboard routes
import MemberDashboard from "./pages/Member/Dashboard";
import SearchBooks from "./pages/Member/SearchBooks";
import Categories from "./pages/Member/Categories";
import LibraryCard from "./pages/Member/LibraryCard";
import LoanHistory from "./pages/Member/LoanHistory";
import Fines from "./pages/Member/Fines";
import Events from "./pages/Member/Events";
import Reviews from "./pages/Member/Reviews";

// Librarian dashboard routes
import LibrarianDashboard from "./pages/Librarian/Dashboard";
import Inventory from "./pages/Librarian/Inventory";
import LoanManagement from "./pages/Librarian/LoanManagement";
import Reservations from "./pages/Librarian/Reservations";
import Notifications from "./pages/Librarian/Notifications";
import MemberProfiles from "./pages/Librarian/Members";
import Announcements from "./pages/Librarian/Announcements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Legacy/Temporary Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/users" element={<Members />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Members />} />
          <Route path="/admin/books" element={<Books />} />
          <Route path="/admin/branches" element={<Dashboard />} />
          <Route path="/admin/settings" element={<Dashboard />} />
          <Route path="/admin/reports" element={<Dashboard />} />
          <Route path="/admin/announcements" element={<Dashboard />} />
          
          {/* Member Dashboard Routes */}
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/search" element={<SearchBooks />} />
          <Route path="/member/categories" element={<Categories />} />
          <Route path="/member/card" element={<LibraryCard />} />
          <Route path="/member/history" element={<LoanHistory />} />
          <Route path="/member/fines" element={<Fines />} />
          <Route path="/member/events" element={<Events />} />
          <Route path="/member/reviews" element={<Reviews />} />
          
          {/* Librarian Dashboard Routes */}
          <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
          <Route path="/librarian/inventory" element={<Inventory />} />
          <Route path="/librarian/loans" element={<LoanManagement />} />
          <Route path="/librarian/reservations" element={<Reservations />} />
          <Route path="/librarian/notifications" element={<Notifications />} />
          <Route path="/librarian/members" element={<MemberProfiles />} />
          <Route path="/librarian/announcements" element={<Announcements />} />
          
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
