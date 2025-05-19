import { Button, Space, Table, message, Modal, ConfigProvider, Pagination } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { useAllProductQuery, useDeleteProductMutation } from "../../redux/apiSlices/productSlice";
import { all } from "axios";
import { useAllMadeQuery, useDeleteMadeMutation } from "../../redux/apiSlices/madeSlice";
import EditMadeModal from "../../components/ui/HowMade/EditMadeModal";

const HowToMade = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // To manage current page state
  const [isDeleting, setIsDeleting] = useState(false); // To handle loading state for delete operation
  
  // const {data: allProducts, isLoading, refetch} = useAllProductQuery();
  const {data: allMade, isLoading, refetch} = useAllMadeQuery({page: currentPage, limit: pageSize});
  // console.log("allMade",allMade);
  const [deleteMade] = useDeleteMadeMutation();
  
  const madeData = allMade?.data?.map((item) => ({
    ...item,
    key: item?._id,
  }));

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this How to Made?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsDeleting(true);
          // Simulate a delete operation
          await deleteMade(id);
          refetch(); // Refetch the data after deletion
          toast.success("How to Made deleted successfully!");
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to delete How to Made.");
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };


  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page state
    setPageSize(pageSize); // Update page size state
  };

  const handleRefetch = () => {
    refetch();
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <span className="text-gray-400">{details.slice(0, 100)}...</span>
      ),
    },
    
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {/* <Link to={`/edit-made/${record._id}`}>
            <Button type="outline" className="border border-white h-9 w-12">
              <FaEdit className="w-8 h-8 text-white" />
            </Button>
          </Link> */}
          {/* <EditMadeModal id={record._id} /> */}
          <Button
            type="outline" className="border border-white h-9 w-12"
            onClick={() => handleDelete(record._id)}
            loading={isDeleting}
          >
            <MdDelete className="w-8 h-8 text-white" />
          </Button>
          <EditMadeModal made={record} handleRefetch={handleRefetch}/>
        </Space>
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between mb-5 items-center">
        <h1 className=" text-2xl font-semibold text-gray-100">How To Made</h1>
        <Link to={`/add-made`}>
          <button className="bg-gray-800 h-10 text-white px-4 rounded-md">
            + Add Made
          </button>
        </Link>
      </div>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table
            columns={columns}
            dataSource={madeData}
            pagination={false}
          // pagination={{
          //   pageSize: pageSize,
          //   showSizeChanger: true,
          //   pageSizeOptions: ["5", "10", "15"],
          //   onShowSizeChange: (current, size) => setPageSize(size),
          //   position: ["bottomCenter"],
          // }}
          />
        </ConfigProvider>
      </div>
      <div className="flex items-center justify-end py-4">
        <Pagination current={allMade?.meta?.page} onChange={(page, pageSize) => handlePageChange(page, pageSize)} total={allMade?.meta?.total} />
      </div>
    </div>
  );
};

export default HowToMade;
