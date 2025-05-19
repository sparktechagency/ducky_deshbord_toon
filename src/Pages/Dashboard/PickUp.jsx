import { useEffect, useState } from 'react';
import { User, Building, MapPin, Phone, Mail, Edit, X, Save, ChevronDown } from 'lucide-react';
import { useCreatePickupMutation, useGetPickupQuery, useUpdatePickupMutation } from '../../redux/apiSlices/pickupSlice';
import { use } from 'react';

  // Initial state from provided data
  // const initialAddressData = {
  //   _id: "6805e12a999c300a7788b623",
  //   zip_code: "6003 DD",
  //   street_name: "Marconilaan",
  //   state_code: "FL",
  //   phone_number: "15479655248",
  //   locality: "Weert",
  //   house_number: "8",
  //   given_name: "First name",
  //   family_name: "Last name",
  //   email_address: "info@examplebusiness.com",
  //   country: "NL",
  //   business: "Example Business Ltd",
  //   address2: "Appartment 4D",
  //   createdAt: "2025-04-21T06:09:46.922Z",
  //   updatedAt: "2025-04-21T06:11:28.762Z",
  //   __v: 0
  // };

export default function PickUp() {
  // State management
  const [showAddress, setShowAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [formData, setFormData] = useState(null);

  const {data: pickupData} = useGetPickupQuery();
  const [createPickup] = useCreatePickupMutation();
  const [updatePickup] = useUpdatePickupMutation();

  useEffect(() => {
    if (pickupData?.data) {
      setAddressData(pickupData?.data);
      setFormData(pickupData?.data);
      setShowAddress(true);
    }
  }, [pickupData?.data]);


  // Handle button click to show address
  const handleShowAddress = async() => {
    const response = await createPickup();
    response?.data && setShowAddress(true);
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
    setFormData(addressData);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Handle save address
  const handleSaveAddress = async() => {
    // setAddressData(formData);
    const response = await updatePickup(formData);
    response?.data && setIsEditing(false);
    // Here you would typically send the update to a backend API
    // console.log("Address saved:", formData);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {!showAddress ? (
        <button
          onClick={handleShowAddress}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors flex items-center"
        >
          <MapPin className="mr-2" size={20} />
          Pickup Address
        </button>
      ) : (
        <div className="w-full max-w-md">
          {isEditing ? (
            // Edit form
            <div className="bg-black rounded-xl shadow-lg overflow-hidden border border-gray-700">
              <div className="bg-blue-800 p-4">
                <h2 className="text-white text-lg font-semibold">Edit Pickup Address</h2>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Personal Info */}
                <div className="space-y-3">
                  <h3 className="text-gray-300 font-medium text-sm">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">First Name</label>
                      <input
                        type="text"
                        name="given_name"
                        value={formData.given_name}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Last Name</label>
                      <input
                        type="text"
                        name="family_name"
                        value={formData.family_name}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Business</label>
                    <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-gray-300 font-medium text-sm">Contact Information</h3>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email_address"
                      value={formData.email_address}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                </div>
                
                {/* Address Info */}
                <div className="space-y-3">
                  <h3 className="text-gray-300 font-medium text-sm">Address Details</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-gray-300 text-sm mb-1">Street</label>
                      <input
                        type="text"
                        name="street_name"
                        value={formData.street_name}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Number</label>
                      <input
                        type="text"
                        name="house_number"
                        value={formData.house_number}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Address Line 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">City</label>
                      <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Zip Code</label>
                      <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">State/Province</label>
                      <input
                        type="text"
                        name="state_code"
                        value={formData.state_code}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    {/* <div className="relative">
                      <label className="block text-gray-300 text-sm mb-1">Country</label>
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-left flex justify-between items-center text-white"
                      >
                        <span>{formData.country}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {showCountryDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-40 overflow-y-auto">
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              onClick={() => handleCountrySelect(country.code)}
                              className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                            >
                              {country.name} ({country.code})
                            </div>
                          ))}
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 p-4 flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  Save Address
                </button>
              </div>
            </div>
          ) : (
            // View address card
            <div className="bg-black rounded-xl shadow-lg overflow-hidden border border-gray-700">
              <div className="bg-blue-800 p-4 flex justify-between items-center">
                <h2 className="text-white text-lg font-semibold flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Pickup Address
                </h2>
                <button
                  onClick={handleEdit}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="p-5 space-y-5">
                <div className="flex items-start space-x-4">
                  <User className="text-blue-400 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-white">
                      {addressData.given_name} {addressData.family_name}
                    </h3>
                    <div className="flex items-center mt-1 text-gray-400">
                      <Building className="text-gray-500 mr-1" size={14} />
                      <p>{addressData.business}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="text-blue-400 mt-1" size={20} />
                  <div className="text-gray-300">
                    <p>{addressData.street_name} {addressData.house_number}</p>
                    <p>{addressData.address2}</p>
                    <p>{addressData.zip_code}, {addressData.locality}</p>
                    <p>{addressData.state_code}, {addressData.country}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Phone className="text-blue-400 mr-2" size={16} />
                    <p className="text-gray-300">{addressData.phone_number}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-blue-400 mr-2" size={16} />
                    <p className="text-gray-300 text-sm">{addressData.email_address}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Updated on {formatDate(addressData.updatedAt)}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 p-4 flex justify-end items-center">
                
                <p className="text-xs text-gray-500">
                  ID: {addressData._id}
                  {/* ID: {addressData._id.substring(0, 8)}... */}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}