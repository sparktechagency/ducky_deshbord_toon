import { Menu } from "antd";
import { useEffect, useState } from "react";
import { GiPlasticDuck } from "react-icons/gi";
import { MdFeaturedPlayList } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/duckyLogo.png";
import { FaMoneyBillTransfer} from "react-icons/fa6";
import { FaBorderStyle } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("toon_authToken");
    sessionStorage.removeItem("toon_authToken");
    Cookies.remove("toon_refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/products",
      icon: <MdFeaturedPlayList size={24} />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: "/how-to-made",
      icon: <GiPlasticDuck size={24} />,
      label: <Link to="/how-to-made">How To Made</Link>,
    },
    {
      key: "/users",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/orders",
      icon: <FaBorderStyle size={24} />,
      label: <Link to="/orders?currentPage=1&pageSize=10">Orders</Link>,
    },
    // {
    //   key: "/pickup",
    //   icon: <IoLocationOutline size={24} />,
    //   label: <Link to="/pickup">Pickup</Link>,
    // },
    // {
    //   key: "/shipping",
    //   icon: <MdOutlineLocalShipping size={24} />,
    //   label: <Link to="/shipping">Shipping</Link>,
    // },
    {
      key: "/shipments",
      icon: <FaShippingFast size={24} />,
      label: <Link to="/shipments">Shipments</Link>,
    },
    {
      key: "/earnings",
      icon: <FaMoneyBillTransfer size={24} />,
      label: <Link to="/earnings">Earnings</Link>,
    },
    {
      key: "/reports",
      icon: <TbMessageReport size={24} />,
      label: <Link to="/reports">Reports</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/about-us",
          label: (
            <Link to="/about-us" className="text-white hover:text-white">
              About Us
            </Link>
          ),
        },
        {
          key: "/our-vision",
          label: (
            <Link to="/our-vision" className="text-white hover:text-white">
              Our Vision
            </Link>
          ),
        },
        {
          key: "/terms-and-condition",
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms & Conditions
            </Link>
          ),
        },
        {
          key: "/f-a-q",
          label: (
            <Link to="/f-a-q" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
