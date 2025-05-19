import { useState } from 'react';
import { X, User, Package, Phone, MapPin, Calendar, CreditCard, Clock, CheckCircle, TrendingUp, Truck, Flag } from 'lucide-react';
import { FaEye } from "react-icons/fa";

export default function OrderDetailsModal({ orderData }) {
  const [isOpen, setIsOpen] = useState(false);

  const refactorFileUrl = (url) => {
    const fileUrl = url?.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    // console.log("fileUrl : ", fileUrl);
    return fileUrl;
  }

 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'completed': 'bg-blue-100 text-blue-800',
      'received': 'bg-purple-100 text-purple-800',
      'ongoing': 'bg-yellow-100 text-yellow-800',
      'delivery': 'bg-indigo-100 text-indigo-800',
      'finished': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'paid': 'bg-emerald-100 text-emerald-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'received': return <Package size={16} />;
      case 'ongoing': return <TrendingUp size={16} />;
      case 'delivery': return <Truck size={16} />;
      case 'finished': return <Flag size={16} />;
      case 'cancelled': return <X size={16} />;
      case 'paid': return <CreditCard size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        <FaEye size={20}/>
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-700 rounded-lg shadow-xl  max-w-[1000px] my-8">
            {/* Modal Header */}
            <div className="sticky top-0 rounded-t-lg bg-gray-800 text-white px-6 h-16 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className='w-full h-[calc(96vh-68px)] overflow-y-scroll scrollbar-hidden'>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Order Summary */}
                <div className="md:col-span-2 space-y-6">
                  {/* Order Information */}
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <Package size={20} className="mr-2 text-indigo-400" />
                      Order Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Order ID</p>
                        <p className="font-medium">{orderData?._id.substring(0, 10)}...</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Order Date</p>
                        <p className="font-medium">{formatDate(orderData?.orderDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p className="font-medium text-lg">${orderData?.totalAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(orderData?.status)}`}>
                            {getStatusIcon(orderData?.status)}
                            <span className="ml-1 capitalize">{orderData?.status}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-400">Payment</p>
                          <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(orderData?.paymentStatus)}`}>
                            {getStatusIcon(orderData?.paymentStatus)}
                            <span className="ml-1 capitalize">{orderData?.paymentStatus}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <h4 className="text-lg font-semibold bg-gray-800 px-4 py-2 border-b border-gray-500">
                      Products ({orderData?.productList?.length})
                    </h4>
                    <div className="divide-y divide-gray-600">
                      {orderData?.productList?.map((product) => (
                        <div key={product._id} className="p-4 flex items-start">
                          <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-100">
                            <img
                              src={refactorFileUrl(product?.productId?.coverImage)}
                              alt={product?.productId?.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h5 className="font-medium text-gray-300">{product?.productId?.fullName}</h5>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product?.productId?.details}</p>
                            <div className="mt-2 flex justify-between">
                              <div className="text-sm text-gray-300">
                                <span className="font-medium">${product?.price.toFixed(2)}</span> × {product?.quantity}
                              </div>
                              <div className="font-medium text-gray-300">
                                ${(product?.price * product?.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-t border-gray-500">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-bold text-indigo-600">${orderData?.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order History */}
                  <div className="bg-gray-800  rounded-lg overflow-hidden">
                    <h4 className="text-lg font-semibold bg-gray-800 px-4 py-2 border-b border-gray-600">
                      Order History
                    </h4>
                    <div className="p-4">
                      <div className="relative">
                        {orderData?.history?.map((historyItem, index) => (
                          <div key={historyItem._id} className="flex items-start mb-4 relative">
                            {index < orderData?.history.length - 1 && (
                              <div className="absolute z-1 top-6 left-2.5 w-[2px] h-full bg-gray-300"></div>
                            )}
                            <div className={`relative z-10 flex-shrink-0 w-5 h-5 rounded-full mt-1.5 mr-3 ${getStatusColor(historyItem.status)} flex items-center justify-center`}>
                              {getStatusIcon(historyItem.status)}
                            </div>
                            <div className="flex-1 relative z-10">
                              <h5 className="font-medium text-gray-200 capitalize">{historyItem.status}</h5>
                              <p className="text-sm text-gray-500">{historyItem?.date !== null ? formatDate(historyItem?.date) : "............................."}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-6">
                  {/* Customer Profile */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <h4 className="text-lg font-semibold bg-gray-800 px-4 py-2 border-b border-gray-600 flex items-center">
                      <User size={18} className="mr-2 text-indigo-400" />
                      Customer
                    </h4>
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={refactorFileUrl(orderData?.userId.image)}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h5 className="font-medium text-gray-300">{orderData?.userId.fullName}</h5>
                          <p className="text-sm text-gray-400">{orderData?.userId.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <Phone size={16} className="mr-2 text-gray-200 mt-0.5" />
                          <span className='text-sm font-light text-gray-300'>{orderData?.userId.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin size={16} className="mr-2 text-gray-200 mt-0.5" />
                          <span className='text-sm font-light text-gray-300'>{orderData?.userId.address}</span>
                        </div>
                        <div className="flex items-start">
                          <Calendar size={16} className="mr-2 text-gray-200 mt-0.5" />
                          <span className='text-sm font-light text-gray-300'>Member since {new Date(orderData?.userId.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-gray-800  rounded-lg overflow-hidden">
                    <h4 className="text-lg font-semibold bg-gray-800 px-4 py-2 border-b border-gray-600 flex items-center">
                      <Truck size={18} className="mr-2 text-indigo-400" />
                      Shipping Details
                    </h4>
                    <div className="p-4 space-y-3 text-sm font-light">
                      <div>
                        <p className="text-gray-500">Recipient</p>
                        <p className="">{orderData?.given_name} {orderData?.family_name}</p>
                        {orderData?.business && <p className="">{orderData?.business}</p>}
                      </div>
                      <div>
                        <p className="text-gray-500">Address</p>
                        <p>{orderData?.street_name} {orderData?.house_number}</p>
                        {orderData?.address2 && <p>{orderData?.address2}</p>}
                        <p>{orderData?.zip_code}, {orderData?.locality}</p>
                        <p>{orderData?.state_code}, {orderData?.country}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p>{orderData?.phone_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}