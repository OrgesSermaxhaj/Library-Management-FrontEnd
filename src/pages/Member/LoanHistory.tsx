
import MemberLayout from "@/components/layout/MemberLayout";

const LoanHistory = () => {
  return (
    <MemberLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loan History</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">Complete loan history will be displayed here.</p>
        </div>
      </div>
    </MemberLayout>
  );
};

export default LoanHistory;
