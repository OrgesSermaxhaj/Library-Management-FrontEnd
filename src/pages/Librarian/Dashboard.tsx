
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import TodaysActivity from "@/components/dashboard/TodaysActivity";
import BookInventory from "@/components/dashboard/BookInventory";
import QrScanButton from "@/components/dashboard/QrScanButton";
import ServiceStatus from "@/components/dashboard/ServiceStatus";
import BranchTable from "@/components/dashboard/BranchTable";

const LibrarianDashboard = () => {
  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Librarian Dashboard</h1>
          <QrScanButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Today's Activity and Service Status in a narrower column */}
          <div className="lg:col-span-1 space-y-6">
            <TodaysActivity />
            <ServiceStatus />
          </div>
          
          {/* Book Inventory and Branch table in a wider column */}
          <div className="lg:col-span-3 space-y-6">
            <BookInventory />
            <BranchTable />
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
