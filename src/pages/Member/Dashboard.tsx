import MemberLayout from "@/components/layout/MemberLayout";
import ActiveLoansCard from "@/components/dashboard/ActiveLoansCard";
import ReservationsCard from "@/components/dashboard/ReservationsCard";
import FinesHistoryCard from "@/components/dashboard/FinesHistoryCard";

const MemberDashboard = () => {
  return (
    <MemberLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Member Dashboard</h1>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Active Loans and Reservations taking up full width on smaller screens and 2/3 on larger screens */}
          <div className="xl:col-span-2 space-y-6">
            <ActiveLoansCard />
            <ReservationsCard />
          </div>
          
          {/* Fines History Card taking up 1/3 width on larger screens */}
          <div>
            <FinesHistoryCard />
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
