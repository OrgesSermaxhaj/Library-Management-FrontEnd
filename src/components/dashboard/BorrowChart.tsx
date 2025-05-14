
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

const BorrowChart = () => {
  return (
    <div className="bg-library-text rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-2">Visitor & Borrower</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={10}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: "white" }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: "white" }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#fff", 
                color: "#1A1F2C",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
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
              name="Visitor"
            />
            <Bar 
              dataKey="borrower" 
              fill="#FFFFFF" 
              radius={[4, 4, 0, 0]} 
              name="Borrower"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BorrowChart;
