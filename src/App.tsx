
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

// Member dashboard routes
import MemberDashboard from "./pages/Member/Dashboard";
import SearchBooks from "./pages/Member/SearchBooks";
import Categories from "./pages/Member/Categories";
import LibraryCard from "./pages/Member/LibraryCard";
import LoanHistory from "./pages/Member/LoanHistory";
import Fines from "./pages/Member/Fines";
import Events from "./pages/Member/Events";
import Reviews from "./pages/Member/Reviews";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/users" element={<Members />} /> {/* Temporary mapping */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Member Dashboard Routes */}
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/search" element={<SearchBooks />} />
          <Route path="/member/categories" element={<Categories />} />
          <Route path="/member/card" element={<LibraryCard />} />
          <Route path="/member/history" element={<LoanHistory />} />
          <Route path="/member/fines" element={<Fines />} />
          <Route path="/member/events" element={<Events />} />
          <Route path="/member/reviews" element={<Reviews />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
