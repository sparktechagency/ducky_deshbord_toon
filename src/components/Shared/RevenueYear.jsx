import { useEffect, useState } from "react";
import { Select } from "antd"; // Assuming Select is from Ant Design
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import moment from "moment/moment";
import { set } from "react-hook-form";
import { useRevenueYearQuery } from "../../redux/apiSlices/earningSlice";
import { MdOutlineEuroSymbol } from "react-icons/md";


// Function to convert month number to month name
const monthConverter = (no) => {
  switch (no) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "Jan";
  }
}


// Dropdown Options for Duration
const options = [
  {
    value: '2025',
    label: '2025',
  },
  {
    value: '2026',
    label: '2026',
  },
  {
    value: '2027',
    label: '2027',
  },
  {
    value: '2028',
    label: '2028',
  },
  {
    value: '2029',
    label: '2029',
  },
  {
    value: '2030',
    label: '2030',
  }
]

// const data = [
//   {
//     "month": 1,
//     "totalIncome": 0
//   },
//   {
//     "month": 2,
//     "totalIncome": 0
//   },
//   {
//     "month": 3,
//     "totalIncome": 500
//   },
//   {
//     "month": 4,
//     "totalIncome": 200
//   },
//   {
//     "month": 5,
//     "totalIncome": 400
//   },
//   {
//     "month": 6,
//     "totalIncome": 100
//   },
//   {
//     "month": 7,
//     "totalIncome": 600
//   },
//   {
//     "month": 8,
//     "totalIncome": 300
//   },
//   {
//     "month": 9,
//     "totalIncome": 700
//   },
//   {
//     "month": 10,
//     "totalIncome": 300
//   },
//   {
//     "month": 11,
//     "totalIncome": 400
//   },
//   {
//     "month": 12,
//     "totalIncome": 100
//   }
// ];



//---------------------------------------- Total Revenue Component ----------------------------------------//
const RevenueYear = () => {
  const [activeChart, setActiveChart] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // const [isLoading, setIsLoading] = useState(false);

  const { data:data } = useRevenueYearQuery(selectedYear);


  const chartData = data?.data?.map((item) => ({
    ...item,
    month: monthConverter(item.month),
  }));
  // console.log("General State :", chartData);


  // Custom Tooltip Function
  const renderCustomTooltip1 = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, totalIncome } = payload[0].payload; // Access the specific data point
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
          <p className="flex items-center gap-2 font-semibold">Revenue: {totalIncome.toFixed(2)} <MdOutlineEuroSymbol /></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full border border-gray-200 p-3 rounded-2xl">
      <div className="flex items-center justify-between px-8 pb-3">
        <h4 className="text-2xl font-semibold text-white">Revenue Yearly</h4>
        <div className="flex items-center justify-end gap-1">
          <div>
            <Select
              placeholder="Year"
              style={{
                width: 120,
              }}
              onChange={(value) => setSelectedYear(value)}
              options={options}
            />
          </div>
        </div>
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
          <XAxis dataKey="month" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20} />
          <Tooltip content={renderCustomTooltip1} />

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

export default RevenueYear;
