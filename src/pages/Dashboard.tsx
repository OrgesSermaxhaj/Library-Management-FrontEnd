
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import BorrowChart from "@/components/dashboard/BorrowChart";
import OverdueTable from "@/components/dashboard/OverdueTable";
import MemberDetail from "@/components/dashboard/MemberDetail";
import { BookOpen, Clock, Users, UserPlus } from "lucide-react";

const Dashboard = () => {
  const [showMemberDetails, setShowMemberDetails] = useState(true);
  
  const memberData = {
    name: "Eleanor Amarlis",
    joinYear: 2020,
    avatar: "https://github.com/shadcn.png",
    books: [
      {
        id: "1",
        title: "Sea of Tranquility: A Novel",
        author: "Emily St. John Mandel",
        borrowDate: "May 29, 2022",
        returnDate: "Jun 15, 2022",
        isOverdue: true,
        daysOverdue: 2,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop",
      },
      {
        id: "2",
        title: "Ender's Game",
        author: "Orson Scott Card",
        borrowDate: "May 29, 2022",
        returnDate: "Jun 15, 2022",
        isOverdue: true,
        daysOverdue: 2,
        coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=1935&auto=format&fit=crop",
      }
    ]
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-library-background">
      <Sidebar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 overflow-y-auto p-8 ${showMemberDetails ? 'pr-0' : ''}`}>
          <Header 
            title="Dashboard" 
            showFilterOptions={true}
          />
          
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={BookOpen} 
              title="Borrowed" 
              value="142" 
            />
            <StatsCard 
              icon={Clock} 
              title="Overdue" 
              value="8" 
              iconBgColor="bg-library-danger"
            />
            <StatsCard 
              icon={Users} 
              title="Visitors" 
              value="532" 
              iconBgColor="bg-blue-500"
            />
            <StatsCard 
              icon={UserPlus} 
              title="New member" 
              value="42" 
              iconBgColor="bg-green-500"
            />
          </div>
          
          <div className="mb-8">
            <BorrowChart />
          </div>
          
          <div className="mb-8">
            <OverdueTable />
          </div>
        </div>
        
        {showMemberDetails && (
          <div className="w-[350px] border-l border-library-border overflow-y-auto">
            <div className="p-4 sticky top-0 bg-white border-b border-library-border">
              <Header 
                title=""
                showMemberDetails={true}
                onCloseMemberDetails={() => setShowMemberDetails(false)}
              />
            </div>
            <div className="p-4">
              <MemberDetail member={memberData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
