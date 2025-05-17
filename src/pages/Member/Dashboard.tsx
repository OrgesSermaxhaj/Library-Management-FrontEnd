
import MemberLayout from "@/components/layout/MemberLayout";
import ActiveLoansCard from "@/components/dashboard/ActiveLoansCard";
import ReservationsCard from "@/components/dashboard/ReservationsCard";
import FinesHistoryCard from "@/components/dashboard/FinesHistoryCard";

const MemberDashboard = () => {
  return (
    <MemberLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Member Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActiveLoansCard />
            <ReservationsCard />
          </div>
          
          <div className="block xl:hidden">
            <FinesHistoryCard />
          </div>
        </div>
        
        <div className="hidden xl:block">
          <FinesHistoryCard />
        </div>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
