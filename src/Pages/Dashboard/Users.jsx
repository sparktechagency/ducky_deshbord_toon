import React, { useState } from "react";
import { Table, Space, Avatar, ConfigProvider, Modal, Pagination } from "antd";
import { useUserBlockMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";
import UserProfileModal from "../../components/ui/Users/UserCard";



const Users = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // To manage current page state
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [userBlock] = useUserBlockMutation();
  const { data: users, isLoading, refetch } = useUsersQuery({ searchTerm, page: currentPage, limit: pageSize }, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const userData = users?.data.map((user) => ({
    ...user,
    key: user._id,
  }));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">Loading...</div>
    );
  }


  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const refactorFileUrl = (url) => {
    const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    // console.log("fileUrl : ", fileUrl);
    return fileUrl;
  }

  const handleBlock = async (record) => {
    Modal.confirm({
      title: `Are you sure you want to ${!record.isActive ? "unblock" : "block"} ${record.fullName}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsDeleting(true);
          // Simulate a delete operation
          const response = await userBlock(record._id);
          if (response?.data) {
            refetch(); // Refetch the data after deletion
            toast.success(`${!record.isActive ? "Unblocked" : "Blocked"} user successfully!`);
          } else {
            toast.error("Failed to block/unblock user.");
          }
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to block/unblock user.");
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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return <span>...{id.slice(16)}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => {
        const name = text || "Unknown";
        const imgUrl = refactorFileUrl(record?.image);

        return (
          <Space>
            <Avatar src={imgUrl} alt={text} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Activity",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => {
        return (
          <div onClick={() => handleBlock(record)} loading={isDeleting} className={`${isActive ? "text-green-500" : "text-red-500"} cursor-pointer`}>
            {isActive ? "Active" : "Inactive"}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          {/* <Link to={`/user/profile/${record.id}`}>
            <Button type="outline" className="border border-gray-100 bg-black text-gray-100 hover:bg-gray-700">
              Details
            </Button>
          </Link> */}
          <UserProfileModal userData={record} />
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

  return (
    <div className="">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-semibold text-white my-5">Users</h1>
        <div className="w-full max-w-[500px] flex items-center gap-1">
          <input onChange={(e) => handleSearch(e.target.value)} placeholder="Search by name or email" className="py-2 px-3 bg-gray-700 outline-none border border-gray-300 focus:bg-gray-800 text-white rounded-xl w-full" />
          {/* <Button size="large" onClick={() => handleSearch(searchValue)} classNames="">Search</Button> */}
        </div>
      </div>
      <div className="bg-black p-4">
        <ConfigProvider theme={theme}>
          <Table
            columns={columns}
            dataSource={userData}
            pagination={false}
            scroll={{ x: 1000 }}
          />
        </ConfigProvider>
      </div>
      <div className="flex items-center justify-end py-4">
        {/* <Pagination current={data?.data?.meta?.page} onChange={(page, pageSize) => console.log(page, pageSize)} total={100} /> */}
        <Pagination current={users?.meta?.page} onChange={(page, pageSize) => handlePageChange(page, pageSize)} total={users?.meta?.total} />
      </div>

    </div>
  );
};

export default Users;
