import React, { useEffect } from "react";
import { Table, Button, ConfigProvider, Select, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useOrdersQuery, useOrderStatusMutation } from "../../redux/apiSlices/orderSlice";
import toast from "react-hot-toast";
import { t } from "i18next";
import { Link } from "react-router-dom";
import OrderDetailsModal from "../../components/ui/Orders/OrderDetails";
import { MdLocalShipping } from "react-icons/md";
import { useAllBookingShipmentQuery, useAllShippingQuery, useCreateShippingMutation } from "../../redux/apiSlices/shippingSlice";
import { Ship } from "lucide-react";
import ShipmentDetailsModal from "../../components/Shared/ShipmentDetails";




const Shipment = () => {
  

  const { data: allShipments, isLoading, refetch } = useAllBookingShipmentQuery();

  // console.log("allShipments : ", allShipments);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const shipmentData = allShipments?.data?.map((shipment,index) => {
    return {
      ...shipment,
      key: index
    }
  });

  // useEffect(() => {
  //   console.log("shipmentData : ", shipmentData);
  // }, [shipmentData]);



  const refactorFileUrl = (url) => {
    const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    // console.log("fileUrl : ", fileUrl);
    return fileUrl;
  }


  const columns = [
    // {
    //   title: "Image",
    //   key: "picture",
    //   render: (record) => (
    //     <img
    //       src={refactorFileUrl(record?.picture)}
    //       alt="Product"
    //       className="w-16 h-12 object-cover"
    //     />
    //   ),
    // },
    {
      title: "Wuunder ID",
      dataIndex: "wuunder_id",
      key: "wuunder_id",
      render: (id) => <p className="text-gray-50 font-semibold">{id}</p>,
    },
    {
      title: "Pickup Date",
      dataIndex: "pickup_date",
      key: "pickup_date",
    },
    {
      title: "Pickup Address",
      dataIndex: "pickup_address",
      key: "pickup_address",
      render: (pickup_address) => <p className="text-gray-50 font-semibold"> {pickup_address?.street_name} {pickup_address?.city}, {pickup_address?.country}</p>,
    },
    {
      title: "Delivery Address",
      dataIndex: "delivery_address",
      key: "delivery_address",
      render: (delivery_address) => <p className="text-gray-50 font-semibold">{delivery_address?.street_name} {delivery_address?.city}, {delivery_address?.country}</p>,
    },
    {
      title: "Item Value",
      dataIndex: "value",
      key: "value",
      render: (a) => (
        <p className="text-green-500 font-semibold">€ {a.toFixed(2)}</p>
      ),
    },
    {
      title: "W*H*L",
      key: "lwh",
      render: (record) => (
        <p className="text-gray-50 font-semibold">{record?.width} * {record?.height} * {record?.length }</p>
      ),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (weight) => (
        <p className="text-gray-50 font-semibold">{weight}</p>
      ),
    },
    {
      title: "Items",
      dataIndex: "number_of_items",
      key: "number_of_items",
    },
    {
      title: "Customer Reference",
      dataIndex: "customer_reference",
      key: "customer_reference",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <ShipmentDetailsModal shipmentData={record} />
        </div>
      ),
    },
  ];



  // const handleDelete = (key) => {

  //   console.log(`Deleting order with key: ${key}`);
  //   // Add logic to delete the order here
  // };

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-50 my-5">Shipments</h1>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table columns={columns} dataSource={shipmentData} rowKey="key" pagination={false} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Shipment;
