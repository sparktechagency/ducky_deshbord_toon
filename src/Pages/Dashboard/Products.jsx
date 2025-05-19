import { Button, Space, Table, message, Modal, ConfigProvider, Pagination } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { useAllProductQuery, useDeleteProductMutation } from "../../redux/apiSlices/productSlice";
import { all } from "axios";
import EditProductModal from "../../components/ui/Products/EditProductModal";


const Products = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // To manage current page state
  const [isDeleting, setIsDeleting] = useState(false); // To handle loading state for delete operation

  const { data: allProducts, isLoading, refetch } = useAllProductQuery({page: currentPage, limit: pageSize});
  const [deleteProduct] = useDeleteProductMutation();


  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsDeleting(true);
          // Simulate a delete operation
          await deleteProduct(id);
          refetch(); // Refetch the data after deletion
          toast.success("Product deleted successfully!");
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to delete product.");
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

  const productData = allProducts?.data?.map((product, index) => ({
    ...product,
    key: product?._id,
    no: index + 1 + (currentPage - 1) * pageSize,
    coverImage: product?.coverImage?.startsWith("http") ? product?.coverImage : `${import.meta.env.VITE_BASE_URL}/${product?.coverImage}`
  }));

  // console.log(productData, "productData?.coverImage");

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (coverImage) => (
        <img src={coverImage} alt="Product" className="rounded-2xl w-20 h-16" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Group",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-gray-400">{price}$</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => (
        <span className="text-gray-400">{stock}</span>
      ),
    },
    {
      title: "W * H * L",
      key: "dimensions",
      render: (_, record) => (
        <span className="text-gray-400">{record.width} * {record.height} * {record.length}</span>
      ),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (weight) => (
        <span className="text-gray-400">{weight}</span>
      ),
    },
    // {
    //   title: "Created",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
    // },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {/* <Link to={`/edit-product/${record._id}`}>
            <Button type="outline" className="border border-white h-9 w-12">
              <FaEdit className="w-8 h-8 text-white" />
            </Button>
          </Link> */}
          <EditProductModal product={record} />
          <Button
            type="outline" className="border border-red-700 h-9 w-12"
            onClick={() => handleDelete(record._id)}
            loading={isDeleting}
          >
            <MdDelete className="w-8 h-8 text-red-700" />
          </Button>
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
        <h1 className=" text-2xl font-semibold text-gray-100">Manage Products</h1>
        <Link to={`/add-product`}>
          <button className="bg-gray-800 h-10 text-white px-4 rounded-md">
            + Add Products
          </button>
        </Link>
      </div>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table
            columns={columns}
            dataSource={productData}
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
        {/* <Pagination current={data?.data?.meta?.page} onChange={(page, pageSize) => console.log(page, pageSize)} total={100} /> */}
        <Pagination current={allProducts?.meta?.page} onChange={(page, pageSize) => handlePageChange(page, pageSize)} total={allProducts?.meta?.total} />
      </div>
    </div>
  );
};

export default Products;
