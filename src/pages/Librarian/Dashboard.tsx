
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import TodaysActivity from "@/components/dashboard/TodaysActivity";
import BookInventory from "@/components/dashboard/BookInventory";
import QrScanButton from "@/components/dashboard/QrScanButton";

const LibrarianDashboard = () => {
  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Librarian Dashboard</h1>
          <QrScanButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Activity taking up 1/3 width on larger screens */}
          <div>
            <TodaysActivity />
          </div>
          
          {/* Book Inventory taking up 2/3 width on larger screens */}
          <div className="lg:col-span-2">
            <BookInventory />
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
