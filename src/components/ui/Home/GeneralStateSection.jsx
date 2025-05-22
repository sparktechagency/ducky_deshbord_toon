import { FaUsers } from "react-icons/fa6";
import { useUsersQuery } from "../../../redux/apiSlices/userSlice";
import { useAllProductQuery } from "../../../redux/apiSlices/productSlice";
import { useOrdersQuery } from "../../../redux/apiSlices/orderSlice";
import { useEarningsQuery } from "../../../redux/apiSlices/earningSlice";

const GeneralStateSection = () => {
  const { data: users } = useUsersQuery({searchTerm: "", page: 1, limit: 10});
  const {data: products} = useAllProductQuery({ page: 1, limit: 10});
  const { data: orders } = useOrdersQuery({ page: 1, limit: 10});
  const {data: earnings} = useEarningsQuery({ page: 1, limit: 10});

  // Simulated dummy data
  const generalState = {
    data: {
      totalUsers: 1500,
      totalProducts: 120,
      totalOrders: 45,
      totalRevenue: 320,
    },
  };


  const state = generalState?.data;

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="bg-gray-900 border border-gray-50 text-gray-50 rounded-2xl py-6 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <FaUsers color="#000000" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base text-white">Total Users</h2>
          <h3 className="text-center text-2xl font-semibold">
            {users?.meta?.total}
          </h3>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-50 text-gray-50 rounded-2xl py-6 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
        <h2 className="text-center text-2xl text-base text-white">Total Products</h2>
          <h3 className="text-center text-2xl font-semibold">
            {products?.meta?.total}
          </h3>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-50 text-gray-50 rounded-2xl py-6 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
        <h2 className="text-center text-2xl text-base text-white">Total Orders</h2>
          <h3 className="text-center text-2xl font-semibold">
            {orders?.meta?.total}
          </h3>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-50 text-gray-50 rounded-2xl py-6 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
        <h2 className="text-center text-2xl text-base text-white">Total Revenue</h2>
          <h3 className="text-center text-2xl font-semibold">
            {earnings?.data?.meta?.total} $
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
