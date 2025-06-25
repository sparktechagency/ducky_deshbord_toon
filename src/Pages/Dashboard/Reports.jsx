import React, { useEffect, useState } from "react";
import { Table, DatePicker, ConfigProvider, Pagination } from "antd";
import moment from "moment";
import { useEarningsQuery } from "../../redux/apiSlices/earningSlice";
import EarningDetailsModal from "../../components/Shared/EarningDetails";
import { useAllReportsQuery } from "../../redux/apiSlices/reportSlice";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const transactions = [
  {
    key: "1",
    transactionId: "TXN001",
    customerName: "John Doe",
    serviceName: "Haircut",
    barberName: "Mike Johnson",
    price: 100,
    adminEarning: 15,
    date: "2024-06-15 10:30:00",
  },
  {
    key: "2",
    transactionId: "TXN002",
    customerName: "Jane Smith",
    serviceName: "Hair Color",
    barberName: "Sarah Brown",
    price: 200,
    adminEarning: 30,
    date: "2024-06-14 14:45:00",
  },
  {
    key: "3",
    transactionId: "TXN003",
    customerName: "Robert White",
    serviceName: "Beard Trim",
    barberName: "David Green",
    price: 80,
    adminEarning: 12,
    date: "2024-06-16 09:15:00",
  },
  // Add 12 more transactions
  {
    key: "15",
    transactionId: "TXN015",
    customerName: "Henry Miller",
    serviceName: "Haircut",
    barberName: "Daniel King",
    price: 115,
    adminEarning: 17.25,
    date: "2024-06-04 12:30:00",
  },
];



const Reports = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // To manage current page state
  const [filteredData, setFilteredData] = useState(transactions);
  const [current, setCurrent] = useState(1);



  const { data: reportData, isLoading, refetch } = useAllReportsQuery({page: currentPage, limit: pageSize});
  
  
  const allReports = reportData?.data?.map((report) => {
    return {
      ...report,
      key: report._id,
    };
  });
  console.log("allReports", allReports);
  
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page state
    setPageSize(pageSize); // Update page size state
    // refetch();
  };
  
  
  
  
  if (isLoading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-start text-gray-50">
        All Reports
      </h1>
      <div className="bg-black p-4">
        {allReports?.map((report) =>(
          <div key={report._id} className="mb-6 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md">
                  <span className="text-2xl font-bold text-white">{report?.userId.fullName?.charAt(0) || '?'}</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{report?.userId.fullName}</p>
                  <p className="text-sm text-gray-400">{report?.userId.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900 text-blue-200 rounded-full mb-1">{dayjs(report?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 mt-2">
              <p className="text-gray-200 text-base leading-relaxed"><span className="font-semibold text-blue-400">Message:</span> {report?.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end py-4">
        <Pagination current={reportData?.meta?.page} onChange={(page, pageSize) => handlePageChange(page, pageSize)} total={reportData?.meta?.total} />
        {/* <Pagination current={data?.data?.meta?.page} onChange={(e) => console.log(e)} total={data?.data?.meta?.totalPage} /> */}
      </div>
    </div>
  );
};

export default Reports
  ;
