
import { useVisitorsData } from "@/hooks/useVisitorsData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { useTheme } from "@/contexts/ThemeContext";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
        <p className="font-medium text-sm">{`${label}`}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400">{`Visitors: ${payload[0].value}`}</p>
        <p className="text-sm text-green-600 dark:text-green-400">{`Borrowers: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

const VisitorsChart = () => {
  const { data, isLoading } = useVisitorsData();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Visitors & Borrowers</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading chart data...</p>
        </div>
      </div>
    );
  }

  const chartColors = {
    visitors: theme === 'dark' ? '#60A5FA' : '#3B82F6',
    borrowers: theme === 'dark' ? '#34D399' : '#10B981',
    grid: theme === 'dark' ? '#374151' : '#E5E7EB',
    text: theme === 'dark' ? '#9CA3AF' : '#6B7280',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Visitors & Borrowers</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: chartColors.text }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: chartColors.text }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
            />
            <Bar 
              dataKey="visitors" 
              name="Visitors" 
              fill={chartColors.visitors} 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="borrowers" 
              name="Borrowers" 
              fill={chartColors.borrowers} 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsChart;
