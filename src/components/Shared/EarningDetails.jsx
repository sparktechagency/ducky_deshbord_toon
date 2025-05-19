import { useState } from 'react';
import { X, User, DollarSign, CreditCard, Calendar, CheckCircle, AlertCircle, ExternalLink, FileText } from 'lucide-react';

const refactorFileUrl = (url) => {
  const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
  // console.log("fileUrl : ", fileUrl);
  return fileUrl;
}

export default function EarningDetailsModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  const paymentData = {
    "_id": "67e3a1ccde30b5aa6f62a3cb",
    "userId": {
      "_id": "67e0cb84d8e7ddac6305d3dd",
      "image": "/uploads/profile/compressed_1000000018-1744024949061-715672450.jpg",
      "fullName": "Ajay Dev",
      "email": "ajay@gmail.com",
      "role": "user",
      "phone": "0189494654654",
      "isActive": true,
      "isDeleted": false,
      "address": "Banasree, Block B, Dhaka.",
      "createdAt": "2025-03-24T03:03:32.599Z",
      "updatedAt": "2025-04-12T12:25:02.221Z",
      "__v": 0
    },
    "method": "stripe",
    "amount": 500,
    "status": "paid",
    "transactionId": "pi_3R6ng5AIobdJUAuw3ybCmhB4",
    "transactionDate": "2025-03-26T06:42:02.504Z",
    "session_id": "cs_test_a1b1kzCKPxdoCJyqdmEtYrxjPOIwUzpFiT18EFfUvIQwnWIAbLfzzdEc7E",
    "orderId": {
      "_id": "67f3c69c6b33a022b0bf4a59",
      "userId": "67e0cb84d8e7ddac6305d3dd",
      "productList": [
        {
          "productId": "6809f83e3dab552bee45867c",
          "price": 400,
          "quantity": 2,
          "_id": "67f3c69c6b33a022b0bf4a5a"
        },
        {
          "productId": "6809f86c3dab552bee458680",
          "price": 300,
          "quantity": 1,
          "_id": "67f3c69c6b33a022b0bf4a5b"
        }
      ],
      "totalAmount": 700,
      "phone": "+1234567890",
      "address": "123 Main Street, Springfield, IL, 62701",
      "orderDate": "2025-04-07T12:35:39.847Z",
      "status": "cancelled",
      "paymentStatus": "paid",
      "history": [
        {
          "status": "completed",
          "date": "2025-04-07T12:37:15.077Z",
          "_id": "67f3c6fbf36cacaa6994b279"
        },
        {
          "status": "received",
          "date": "2025-04-27T09:19:48.917Z",
          "_id": "67f3c6fbf36cacaa6994b27a"
        },
        {
          "status": "ongoing",
          "date": "2025-04-27T09:20:03.880Z",
          "_id": "67f3c6fbf36cacaa6994b27b"
        },
        {
          "status": "delivery",
          "date": "2025-04-27T09:20:08.234Z",
          "_id": "67f3c6fbf36cacaa6994b27c"
        },
        {
          "status": "finished",
          "date": "2025-04-27T09:20:11.718Z",
          "_id": "67f3c6fbf36cacaa6994b27d"
        }
      ],
      "createdAt": "2025-04-07T12:35:40.029Z",
      "updatedAt": "2025-04-27T09:20:48.176Z",
      "__v": 0,
      "zip_code": "6003 DD",
      "street_name": "Marconilaan",
      "state_code": "FL",
      "phone_number": "+31683243251",
      "locality": "Weert",
      "house_number": "8",
      "given_name": "First name",
      "family_name": "Last name",
      "country": "NL",
      "business": "Example Business Ltd.",
      "address2": "Appartment 4D"
    },
    "createdAt": "2025-03-26T06:42:20.272Z",
    "updatedAt": "2025-03-26T06:42:20.272Z"
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'paid': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'refunded': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status === 'paid' ? <CheckCircle size={16} className="mr-1" /> : <AlertCircle size={16} className="mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const truncateString = (str, len) => {
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        Details
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-gray-600 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold flex items-center">
                <CreditCard size={24} className="mr-2" />
                Payment Transaction
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Transaction Summary */}
              <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign size={24} className="text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-300">Amount</h4>
                    <p className="text-2xl font-bold text-gray-50">{formatCurrency(paymentData.amount)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <div className="text-sm text-gray-300 mb-1">Status</div>
                  {getStatusBadge(paymentData.status)}
                </div>
              </div>
              
              {/* Transaction Details */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <h4 className="text-lg font-semibold px-4 py-2 border-b border-gray-600">
                  Transaction Details
                </h4>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <div className="flex items-center mt-1">
                        <p className="font-medium">{truncateString(paymentData.transactionId, 18)}</p>
                        <button className="ml-2 text-green-600 hover:text-green-700">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <div className="flex items-center mt-1">
                        <CreditCard size={16} className="mr-1 text-gray-400" />
                        <p className="font-medium capitalize">{paymentData.method}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transaction Date</p>
                      <p className="font-medium">{formatDate(paymentData.transactionDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Session ID</p>
                      <p className="font-medium text-xs">{truncateString(paymentData.session_id, 20)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Information */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <h4 className="text-lg font-semibold px-4 py-2 border-b border-gray-600 flex items-center">
                  <FileText size={18} className="mr-2 text-green-600" />
                  Related Order
                </h4>
                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <div className="flex items-center">
                        <p className="font-medium">{truncateString(paymentData.orderId._id, 12)}</p>
                        <button className="ml-2 text-green-600 hover:text-green-700">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{new Date(paymentData.orderId.orderDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="font-medium">{formatCurrency(paymentData.orderId.totalAmount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Order Status</p>
                      <p className="font-medium capitalize">{paymentData.orderId.status}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <div className=" rounded p-2 text-sm">
                      {paymentData.orderId.productList.map((item, index) => (
                        <div key={item._id} className="flex justify-between py-1">
                          <span>{index + 1}. Product #{truncateString(item.productId, 8)}</span>
                          <span>{item.quantity} × {formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <h4 className="text-lg font-semibold px-4 py-2 border-b border-gray-200 flex items-center">
                  <User size={18} className="mr-2 text-green-600" />
                  Customer
                </h4>
                <div className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-4">
                    <img
                      src={refactorFileUrl(paymentData.userId.image)}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-300">{paymentData.userId.fullName}</h5>
                    <p className="text-sm text-gray-500">{paymentData.userId.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{paymentData.userId.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            {/* <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}