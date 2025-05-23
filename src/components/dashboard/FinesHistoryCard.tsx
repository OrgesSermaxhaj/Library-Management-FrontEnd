import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinesHistory, FineRecord, LoanHistoryRecord } from "@/hooks/useFinesHistory";
import { DollarSign, ArrowDown } from "lucide-react";
import { format, parseISO } from "date-fns";

const FineItem = ({ fine }: { fine: FineRecord }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{fine.title}</p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{format(parseISO(fine.date), "MMM dd, yyyy")}</span>
          <span className="mx-2">•</span>
          <span>{fine.daysLate} days late</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`font-semibold mr-3 ${fine.status === 'paid' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          ${fine.amount.toFixed(2)}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          fine.status === 'paid' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {fine.status === 'paid' ? 'Paid' : 'Unpaid'}
        </span>
      </div>
    </div>
  );
};

const HistoryItem = ({ history }: { history: LoanHistoryRecord }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{history.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{history.author}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {format(parseISO(history.borrowDate), "MMM dd")} - {format(parseISO(history.returnDate), "MMM dd, yyyy")}
        </p>
        <span className={`text-xs px-2 py-1 rounded-full ${
          history.status === 'returned' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : history.status === 'overdue'
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }`}>
          {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

const FinesHistoryCard = () => {
  const { finesHistory, isLoading, error } = useFinesHistory();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Fines & History</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading your data...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error.toString()}</div>
        ) : !finesHistory ? (
          <div className="p-6 text-center text-gray-500">No data available</div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800/30 flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="font-medium">Total Unpaid Fines</span>
              </div>
              <div className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                ${finesHistory.totalUnpaid.toFixed(2)}
              </div>
            </div>
            
            <Tabs defaultValue="fines" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 gap-4 px-4 pt-2">
                <TabsTrigger value="fines">Fines</TabsTrigger>
                <TabsTrigger value="history">Loan History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fines" className="flex-1 overflow-auto">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {finesHistory.fines.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <p>You have no fines.</p>
                    </div>
                  ) : (
                    finesHistory.fines.map(fine => (
                      <FineItem key={fine.id} fine={fine} />
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="flex-1 overflow-auto">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {finesHistory.history.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <p>No loan history available.</p>
                    </div>
                  ) : (
                    finesHistory.history.map(historyItem => (
                      <HistoryItem key={historyItem.id} history={historyItem} />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-muted-foreground">
              Fines need to be paid at the library desk
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinesHistoryCard;
