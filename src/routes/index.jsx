import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import PrivateRoute from "./PrivateRoute";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
// import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Faq from "../components/ui/Settings/Faq";
import Orders from "../Pages/Dashboard/Orders";
import Earnings from "../Pages/Dashboard/Earnings";
import Products from "../Pages/Dashboard/Products";
import AddProduct from "../components/ui/Products/AddProduct";
import EditProduct from "../components/ui/Products/EditProduct";
import HowToMade from "../Pages/Dashboard/HowToMade";
import AddMade from "../components/ui/HowMade/AddMade";
import EditMade from "../components/ui/HowMade/EditMade";
import AboutUs from "../Pages/Dashboard/AboutUs";
import Shipment from "../Pages/Dashboard/Shipment";
import Reports from "../Pages/Dashboard/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/how-to-made",
        element: <HowToMade />,
      },
      {
        path: "/add-made",
        element: <AddMade />,
      },
      {
        path: "/edit-made/:id",
        element: <EditMade />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },
      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "shipments",
        element: <Shipment />,
      },
      {
        path: "/our-vision",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },

      // {
      //   path: "/change-password",
      //   element: <ChangePassword />,
      // },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
