import React, { useEffect, useState } from "react";
import { Table, Button, ConfigProvider, Select, Modal, Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useOrdersQuery, useOrderStatusMutation } from "../../redux/apiSlices/orderSlice";
import toast from "react-hot-toast";
import { t } from "i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import OrderDetailsModal from "../../components/ui/Orders/OrderDetails";
import { MdLocalShipping } from "react-icons/md";
import { useCreateShippingMutation } from "../../redux/apiSlices/shippingSlice";
import RetryOrderModal from "../../components/ui/Orders/RetryOrder";
const options = [
  {
    value: 'received',
    label: 'Received',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
  },
  {
    value: 'ongoing',
    label: 'Ongoing',
  },
  {
    value: 'delivery',
    label: 'Delivery',
  },
  {
    value: 'finished',
    label: 'Finished',
  },
]




const RunningOrders = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = +searchParams.get('currentPage') || 1;
  const pageSize = +searchParams.get('pageSize') || 10;
  const trackUrl = +searchParams.get('trackUrl') || "";
  console.log(trackUrl);
  // console.log("current page : ", currentPage, "page size : ", pageSize);


  const [orderStatus] = useOrderStatusMutation();

  const { data: allOrders, isLoading, refetch } = useOrdersQuery({ page: currentPage, limit: pageSize, trackUrl: trackUrl });

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, trackUrl]);

  const orderData = allOrders?.data?.map((order) => {
    return {
      ...order,
      key: order._id
    }
  });

  const handlePageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    navigate(`?currentPage=${page}&pageSize=${pageSize}`);
  };


  const handleOrderStatus = async (status, id) => {
    // console.log(`Selected order status: ${status}, Order ID: ${id}`);
    // Add logic to update the order status here
    try {
      const response = await orderStatus({ id, status });
      // console.log("response : ", response);
      if (response?.data) {
        refetch();
        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update order status!");
      }
    } catch (err) {
      toast.error("Order status updated failed!");
    }
  }

  const handleUncompletedOrders = () => {
    // console.log("handleUncompletedOrders");
    navigate(`?currentPage=${currentPage}&pageSize=${pageSize}&trackUrl="false"`);
  };

  const refactorFileUrl = (url) => {
    const fileUrl = url?.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    // console.log("fileUrl : ", fileUrl);
    return fileUrl;
  }


  const columns = [
    {
      title: "Image",
      key: "image",
      render: (record) => (
        <img
          src={refactorFileUrl(record?.productList[0]?.productId?.coverImage)}
          alt="Product"
          className="w-16 h-12 object-cover"
        />
      ),
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <p className="text-gray-50 font-semibold">...{id.slice(16)}</p>,
    },
    {
      title: "Customer Name",
      key: "name",
      render: (record) => (
        <p className="text-gray-50 font-semibold">{record?.userId?.fullName}</p>
      ),
    },
    {
      title: "Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (a) => (
        <p className="text-green-500 font-semibold">$ {a.toFixed(2)}</p>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "trackUrl",
      render: (trackUrl) => (
        <span className="text-yellow-500 font-semibold">
          {trackUrl ? "Completed" : "Pending"}
        </span>
      ),
    },
    // {
    //   title: "Change Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status, record) => (
    //     <div className="">
    //       <ConfigProvider theme={theme}>
    //         <Select
    //           onChange={(value) => handleOrderStatus(value, record._id)}
    //           placeholder={status}
    //           style={{
    //             width: 120,
    //           }}
    //           options={options}
    //         />
    //       </ConfigProvider>
    //     </div>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <OrderDetailsModal orderData={record} />
          <RetryOrderModal order={record} handleRefetch={handleRefetch} />
          {/* <Button disabled={record.status !== "received"} onClick={() => handleShipping(record._id)} type="outline" className={`border h-9 w-12 ${record.status !== "received" ? "bg-gray-500" : "bg-gray-700 hover:bg-gray-800"} `}>
            <MdLocalShipping className="w-8 h-8 text-white" />
          </Button> */}
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
      },
      "Select": {
        "algorithm": true,
        "optionSelectedBg": "rgb(82,83,84)",
        "optionSelectedColor": "rgb(255,255,255)",
        "optionActiveBg": "rgba(0,0,0,0.84)",
        "colorText": "rgba(244,244,244,0.88)",
        "colorBgBase": "rgb(40,40,40)",
        "colorBgContainer": "rgb(0,0,0)",
        "selectorBg": "rgb(0,0,0)",
        "colorIconHover": "rgba(255,255,255,0.88)",
        "colorTextDescription": "rgba(255,255,255,0.45)",
        "colorTextDisabled": "rgba(255,255,255,0.25)",
        "colorTextPlaceholder": "rgb(255,255,255)",
        "colorTextQuaternary": "rgb(255,255,255)",
        "colorWarningOutline": "rgba(255,255,255,0.97)"
      }
    },
    // "algorithm": "dark"
  }


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-50 my-5">Orders Management</h1>
        <button onClick={handleUncompletedOrders} className="text-white border border-white rounded-md px-3 py-1">Check uncompleted orders</button>
      </div>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table columns={columns} dataSource={orderData} rowKey="key" pagination={false} />
        </ConfigProvider>
      </div>
      <div className="flex items-center justify-end py-4">
        {/* <Pagination current={data?.data?.meta?.page} onChange={(page, pageSize) => console.log(page, pageSize)} total={100} /> */}
        <Pagination current={allOrders?.meta?.page} onChange={handlePageChange} total={allOrders?.meta?.total} />
      </div>
    </div>
  );
};

export default RunningOrders;
