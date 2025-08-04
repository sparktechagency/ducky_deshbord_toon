import React, { useState } from "react";
import { Table, DatePicker, ConfigProvider, Pagination } from "antd";
import moment from "moment";
import { useEarningsQuery } from "../../redux/apiSlices/earningSlice";
import EarningDetailsModal from "../../components/Shared/EarningDetails";
import { render } from "react-dom";

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



const Earnings = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // To manage current page state

  const { data: data, isLoading } = useEarningsQuery({page: currentPage, limit: pageSize});

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  const allEarnings = data?.data?.result?.map((earning) => {
    return {
      ...earning,
      key: earning._id,
    };
  });

  
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page state
    setPageSize(pageSize); // Update page size state
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(),
      render: (transactionDate) => moment(transactionDate).format("YYYY-MM-DD"),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (a) => (
        <p className="text-green-500 font-semibold">€ {a.toFixed(2)}</p>
      ),
    },
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <span>{record?.userId?.fullName}</span>
      ),
    },
    {
      title: "Number",
      key: "number",
      render: (record) => (
        <span>{record?.userId?.phone}</span>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (record) => (
        <span>{record?.userId?.email}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <EarningDetailsModal record={record} />
        </div>
      ),
    },
  ];

  const theme = {
    "components": {
      "Table": {
        "colorText": "rgba(255,255,255,0.88)",
        "colorBgContainer": "rgb(5,5,5)",
        "headerColor": "rgba(255,255,255,0.88)",
        "headerBg": "rgb(0,0,0)",
        "borderColor": "rgb(255,255,255)",
        "borderRadius": 0,
        "headerBorderRadius": 0
      }
    },
    // "algorithm": "dark"
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-start text-gray-50">
        Our Earnings
      </h1>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table
            columns={columns}
            dataSource={allEarnings}
            pagination={false}
          />
        </ConfigProvider>
      </div>
      <div className="flex items-center justify-end py-4">
        <Pagination current={data?.data?.meta?.page} onChange={(page, pageSize) => handlePageChange(page, pageSize)} total={data?.data?.meta?.total} />
        {/* <Pagination current={data?.data?.meta?.page} onChange={(e) => console.log(e)} total={data?.data?.meta?.totalPage} /> */}
      </div>
    </div>
  );
};

export default Earnings
  ;
