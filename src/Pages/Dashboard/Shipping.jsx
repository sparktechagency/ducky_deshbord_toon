import React, { useEffect, useState } from "react";
import { Table, Button, ConfigProvider, Select, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useOrdersQuery, useOrderStatusMutation } from "../../redux/apiSlices/orderSlice";
import toast from "react-hot-toast";
import { t } from "i18next";
import { Link } from "react-router-dom";
import OrderDetailsModal from "../../components/ui/Orders/OrderDetails";
import { MdLocalShipping } from "react-icons/md";
import { useAllShippingQuery, useCreateBookingShipmentMutation, useCreateShippingMutation, useDeleteShippingMutation } from "../../redux/apiSlices/shippingSlice";
import ShippingDetailsModal from "../../components/Shared/ShippingDetails";
import { MdDelete } from "react-icons/md";




const Shipping = () => {
  const [isDeleting, setIsDeleting] = useState(false); // To handle loading state for delete operation
  

  const { data: allShipments, isLoading, refetch } = useAllShippingQuery();
  const [deleteShipping] = useDeleteShippingMutation();
  const [createBookingShipment] = useCreateBookingShipmentMutation();

  // console.log("allShipments : ", allShipments);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const shipmentData = allShipments?.data?.map((shipment) => {
    return {
      ...shipment,
      key: shipment._id
    }
  });

  // useEffect(() => {
  //   refetch();
  // }, []);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this shipping?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsDeleting(true);
          // Simulate a delete operation
          await deleteShipping(id);
          refetch(); // Refetch the data after deletion
          toast.success("Shipping deleted successfully!");
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to delete shipping.");
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  const handleShipping = (id) => {
    Modal.confirm({
      title: "Add this product in booking shipment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await createBookingShipment(id);
          refetch(); 
          toast.success("Product add in booking shipment cart successfully!");
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to add product in booking shipment cart.");
        }
      },
    });
  };



  const refactorFileUrl = (url) => {
    const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    console.log("fileUrl : ", fileUrl);
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
      render: (pickup_address) => <p className="text-green-700 font-semibold"> {pickup_address?.street_name} {pickup_address?.city}, {pickup_address?.country}</p>,
    },
    {
      title: "Delivery Address",
      dataIndex: "delivery_address",
      key: "delivery_address",
      render: (delivery_address) => <p className="text-blue-700 font-semibold">{delivery_address?.street_name} {delivery_address?.city}, {delivery_address?.country}</p>,
    },
    {
      title: "Item Value",
      dataIndex: "value",
      key: "value",
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
          <ShippingDetailsModal shippingData={record} />
          <Button onClick={() => handleShipping(record.id)} type="outline" className="border border-white h-9 w-12 hover:bg-gray-800">
            <MdLocalShipping className="w-8 h-8 text-white" />
          </Button>
          <Button
            type="outline" className="border border-red-700 h-9 w-12"
            onClick={() => handleDelete(record.id)}
            loading={isDeleting}
          >
            <MdDelete className="w-8 h-8 text-red-700" />
          </Button>
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-50 my-5">Shipping</h1>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table columns={columns} dataSource={shipmentData} rowKey="key" pagination={false} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Shipping;
