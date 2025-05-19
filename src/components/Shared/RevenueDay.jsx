import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useRevenueDayWeekQuery } from "../../redux/apiSlices/earningSlice";
import moment from "moment";



// Dropdown Options for Duration
// const options = [
//   {
//     value: '24hour',
//     label: 'Daily',
//   },
//   {
//     value: '7day',
//     label: 'Weakly',
//   },
// ]

//---------------------------------------- Total Revenue Component ----------------------------------------//
const RevenueDay = ({passDuration, title}) => {
  const [chartData, setChartData] = useState(passDuration);

  const {data:data, isLoading, refetch} = useRevenueDayWeekQuery(passDuration);
  isLoading && <div className="flex justify-center items-center my-20 text-lg text-secondary">Loading...</div>

  // console.log("Current Hour:", getHour());
  // console.log("Current Day:", getDay());

useEffect(() => {
  if(passDuration === '7day'){
    const weekModifyData = data?.data?.map((item) => ({
      ...item,
      dateHour:  moment(item?.dateHour).format('dd'),
    }));
    setChartData(weekModifyData);
   }
  
  if(passDuration === '24hour'){
    const dayModifyData = data?.data?.map((item) => ({
      ...item,
      dateHour: moment(item?.dateHour).format('hh'),
    }));
    setChartData(dayModifyData);
  }
},[data]);


  // Custom Tooltip Function
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { dateHour, totalIncome } = payload[0].payload; // Access the specific data point
      return (
        <div
          style={{
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            maxWidth: "200px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
          }}
        >
          <p><strong>Revenue: {totalIncome} $</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full border border-gray-200 p-3 rounded-2xl">
      <div className="flex items-center justify-between px-8 pb-3">
        <h4 className="text-2xl font-semibold text-white">{title}</h4>
      </div>
      <div>
      <ResponsiveContainer width="100%" height={375}>
        <AreaChart
          data={chartData}
          syncId="anyId"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="0 4" />
          <XAxis dataKey="dateHour" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20} />
          <Tooltip content={renderCustomTooltip}  />

          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="1%" stopColor="#EBF4FF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EBF4FF" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Area with gradient fill */}
          <Area
            type="monotone"
            dataKey="totalIncome"
            stroke="#2D9CDB"
            strokeWidth={2}
            fill="url(#gradientColor)" // Apply gradient by referencing its ID
            activeDot={{
              fill: "#2D9CDB", // Dot fill color
              stroke: "white", // Dot borders color
              strokeWidth: 6, // Dot borders width
              r: 10, // Dot size (radius)
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueDay;
