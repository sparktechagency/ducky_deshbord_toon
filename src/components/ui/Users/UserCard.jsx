import { useState } from 'react';
import { X, Mail, Phone, MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function UserProfileModal({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  

  const refactorFileUrl = (url) => {
    const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
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
          <div onClick={(e) => e.stopPropagation()} className="rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">User Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Image and Name */}
            <div className="flex flex-col items-center py-6 bg-gray-700">
              <div className="">
                <img
                  style={{
                    clipPath: "circle()",
                    width: 200,
                    height: 200,
                  }}
                  src={refactorFileUrl(userData.image)}
                  alt="User profile"
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-50">{userData.fullName}</h2>
              <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-md">
                <CheckCircle size={16} className="mr-2" />
                <span>{userData.isActive ? "Active" : "Inactive"}</span>
              </div>
            </div>

            {/* User Details */}
            <div className="bg-gray-700 px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-50">
                  <Mail size={18} className="mr-3 text-blue-600" />
                  <span>{userData.email}</span>
                </div>

                <div className="flex items-center text-gray-50">
                  <Phone size={18} className="mr-3 text-blue-600" />
                  <span>{userData.phone || "Not provided"}</span>
                </div>

                <div className="flex items-center text-gray-50">
                  <MapPin size={18} className="mr-3 text-blue-600" />
                  <span>{userData.address || "Not provided"}</span>
                </div>

                <div className="flex items-center text-gray-50">
                  <Calendar size={18} className="mr-3 text-blue-600" />
                  <span>Created: {formatDate(userData.createdAt)}</span>
                </div>

                <div className="flex items-center text-gray-50">
                  <Calendar size={18} className="mr-3 text-blue-600" />
                  <span>Updated: {formatDate(userData.updatedAt)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-400">
                <div className="text-xs text-gray-400">User ID: {userData._id}</div>
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  );
}