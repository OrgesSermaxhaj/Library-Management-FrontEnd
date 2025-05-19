
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ChartData {
  name: string;
  visitor: number;
  borrower: number;
}

const data: ChartData[] = [
  { name: "Mon 12", visitor: 40, borrower: 15 },
  { name: "Tue 13", visitor: 60, borrower: 20 },
  { name: "Wed 14", visitor: 45, borrower: 25 },
  { name: "Thu 15", visitor: 50, borrower: 30 },
  { name: "Fri 16", visitor: 90, borrower: 40 },
  { name: "Sat 17", visitor: 65, borrower: 35 },
  { name: "Sun 18", visitor: 70, borrower: 55 },
];

export const BorrowChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Visitor & Borrower Stats</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={10}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: "currentColor" }} 
              stroke="currentColor"
              opacity={0.5}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: "currentColor" }} 
              stroke="currentColor"
              opacity={0.5}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
                border: "none",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1)"
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
            />
            <Bar 
              dataKey="visitor" 
              fill="#4246F3" 
              radius={[4, 4, 0, 0]} 
              name="Visitors"
            />
            <Bar 
              dataKey="borrower" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]} 
              name="Borrowers"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
