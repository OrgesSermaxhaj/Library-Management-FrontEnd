import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import BrowseByCategory from './pages/Member/BrowseByCategory';
import CategoryView from './pages/Member/CategoryView';

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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Legacy/Temporary Routes - Protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/books" element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          } />
          <Route path="/members" element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          } />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Members />
            </ProtectedRoute>
          } />
          <Route path="/admin/books" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Books />
            </ProtectedRoute>
          } />
          <Route path="/admin/branches" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/announcements" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Member Dashboard Routes */}
          <Route path="/member/dashboard" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <MemberDashboard />
            </ProtectedRoute>
          } />
          <Route path="/member/search" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <SearchBooks />
            </ProtectedRoute>
          } />
          <Route path="/member/categories" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <Categories />
            </ProtectedRoute>
          } />
          <Route path="/member/card" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <LibraryCard />
            </ProtectedRoute>
          } />
          <Route path="/member/history" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <LoanHistory />
            </ProtectedRoute>
          } />
          <Route path="/member/fines" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <Fines />
            </ProtectedRoute>
          } />
          <Route path="/member/events" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/member/reviews" element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <Reviews />
            </ProtectedRoute>
          } />
          <Route path="/member/browse" element={<BrowseByCategory />} />
          <Route path="/member/category/:categoryId" element={<CategoryView />} />
          
          {/* Librarian Dashboard Routes */}
          <Route path="/librarian/dashboard" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <LibrarianDashboard />
            </ProtectedRoute>
          } />
          <Route path="/librarian/inventory" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/librarian/loans" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <LoanManagement />
            </ProtectedRoute>
          } />
          <Route path="/librarian/reservations" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <Reservations />
            </ProtectedRoute>
          } />
          <Route path="/librarian/notifications" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/librarian/members" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <MemberProfiles />
            </ProtectedRoute>
          } />
          <Route path="/librarian/announcements" element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <Announcements />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
