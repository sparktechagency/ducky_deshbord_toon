import { useState } from 'react';
import { Truck, Package, MapPin, User, ShoppingBag, Calendar, Clock, X } from 'lucide-react';
import { FaEye } from "react-icons/fa";

export default function ShipmentDetailsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Sample data from the provided JSON
  const shippingData = {
    "wuunder_id": "AAR-712-848",
    "width": 20,
    "weight": 500,
    "value": 250,
    "track_and_trace_details": {
      "track_and_trace_url": "https://www.dhlparcel.nl/en/follow-your-shipment?tt=JVGL06376990001275972475&pc=6003 DD&lc=en-NL",
      "track_and_trace_code": "JVGL06376990001275972475",
      "carrier_name": "DHL Parcel",
      "carrier_code": "DHL_PARCEL"
    },
    "statuses": [],
    "status": "pending_printing",
    "redirect_url": null,
    "preferred_service_level": "any:most_efficient",
    "picture": "",
    "pickup_date": "2025-05-01",
    "pickup_address": {
      "zip_code": "6003 DD",
      "vat": null,
      "type": null,
      "street_name": "Marconilaan",
      "street_address": null,
      "state_code": "FL",
      "phone_number": "15479655248",
      "locality": "Weert",
      "house_number": "8",
      "given_name": "First name",
      "family_name": "Last name",
      "eori_number": null,
      "email_address": "info@examplebusiness.com",
      "country": "NL",
      "city": "Weert",
      "business": "Example Business Ltd",
      "address2": "Appartment 4D"
    },
    "personal_message": "A very personal message",
    "parcelshop_id": null,
    "ordered_at": "2025-04-30T14:10:42.565354",
    "order_lines": [
      {
        "weight": 500,
        "value": "250",
        "sku": null,
        "quantity": 1,
        "picture_url": null,
        "id": "f4df75bf-bbfb-4f6a-9e89-53777a607d67",
        "hs_code": null,
        "ean": null,
        "description": "string",
        "country_of_origin": null,
        "additional_data": null
      }
    ],
    "number_of_items": 1,
    "meta": {},
    "length": 40,
    "kind": "package",
    "is_return": false,
    "id": "aca862a2-baaf-4c9a-a72d-29d92f123fb9",
    "height": 10,
    "drop_off": false,
    "dimensions": {
      "width_cm": 20,
      "weight_grams": 500,
      "length_cm": 40,
      "kind": "package",
      "height_cm": 10
    },
    "description": "description",
    "delivery_instructions": "delivery instructions",
    "delivery_address": {
      "zip_code": "6003 DD",
      "vat": null,
      "type": null,
      "street_name": "Marconilaan",
      "street_address": null,
      "state_code": "FL",
      "phone_number": "+31683243251",
      "locality": "Weert",
      "house_number": "8",
      "given_name": "First name",
      "family_name": "Last name",
      "eori_number": null,
      "email_address": "ajay@gmail.com",
      "country": "NL",
      "city": "Weert",
      "business": "Example Business Ltd.",
      "address2": "Appartment 4D"
    },
    "delivery": {
      "product_description": "DHL Europlus Benelux",
      "date": "2025-05-02",
      "before_time": "17:00:00",
      "after_time": "09:00:00"
    },
    "customer_reference": "W202301"
  }

  // Format date from ISO string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time from ISO string
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        <FaEye size={20} />
      </button>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div onClick={(e) => e.stopPropagation()} className="bg-black border border-gray-700 rounded-lg shadow-xl w-full max-w-4xl text-white overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Truck className="text-blue-400" size={24} />
              <h2 className="text-xl font-bold">Shipping Order: {shippingData?.wuunder_id}</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Status Bar */}
          <div className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-yellow-600 rounded-full text-sm">
                {shippingData.status.toUpperCase()}
              </div>
              <span className="text-gray-300">ID: {shippingData.id.substring(0, 8)}...</span>
            </div>
            <div className="text-gray-300 text-sm">
              Ref: {shippingData.customer_reference}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'details' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('details')}
            >
              Shipment Details
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'addresses' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('addresses')}
            >
              Addresses
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'items' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('items')}
            >
              Order Items
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'trackTrace' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('trackTrace')}
            >
              Track and Trace Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Package className="mr-2 text-blue-400" size={20} />
                      Package Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-400 text-sm">Dimensions</p>
                        <p>{shippingData.length} × {shippingData.width} × {shippingData.height} cm</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Weight</p>
                        <p>{shippingData.weight / 1000} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Value</p>
                        <p>€{shippingData.value.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Type</p>
                        <p className="capitalize">{shippingData.kind}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Calendar className="mr-2 text-blue-400" size={20} />
                      Dates & Times
                    </h3>
                    <div className="bg-gray-900 p-4 rounded-lg space-y-3">
                      <div>
                        <p className="text-gray-400 text-sm">Order Date</p>
                        <div className="flex items-center justify-between">
                          <p>{formatDate(shippingData.ordered_at)}</p>
                          <p className="text-gray-400">{formatTime(shippingData.ordered_at)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Pickup Date</p>
                        <p>{formatDate(shippingData.pickup_date)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Description</h3>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <p>{shippingData.description}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <MapPin className="mr-2 text-blue-400" size={20} />
                    Pickup Address
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="text-gray-400" size={16} />
                      <p>
                        {shippingData.pickup_address.given_name} {shippingData.pickup_address.family_name}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">{shippingData.pickup_address.business}</p>
                      <p>{shippingData.pickup_address.street_name} {shippingData.pickup_address.house_number}</p>
                      <p>{shippingData.pickup_address.address2}</p>
                      <p>{shippingData.pickup_address.zip_code}, {shippingData.pickup_address.city}</p>
                      <p>{shippingData.pickup_address.country}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-gray-400 text-sm">Contact</p>
                      <p>{shippingData.pickup_address.email_address}</p>
                      <p>{shippingData.pickup_address.phone_number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <MapPin className="mr-2 text-blue-400" size={20} />
                    Delivery Address
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="text-gray-400" size={16} />
                      <p>
                        {shippingData.delivery_address.given_name} {shippingData.delivery_address.family_name}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">{shippingData.delivery_address.business}</p>
                      <p>{shippingData.delivery_address.street_name} {shippingData.delivery_address.house_number}</p>
                      <p>{shippingData.delivery_address.address2}</p>
                      <p>{shippingData.delivery_address.zip_code}, {shippingData.delivery_address.city}</p>
                      <p>{shippingData.delivery_address.country}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-gray-400 text-sm">Contact</p>
                      <p>{shippingData.delivery_address.email_address}</p>
                      <p>{shippingData.delivery_address.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <ShoppingBag className="mr-2 text-blue-400" size={20} />
                  Order Items ({shippingData.order_lines.length})
                </h3>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {shippingData.order_lines.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div>
                              <p className="font-medium">{item.description}</p>
                              <p className="text-gray-400 text-xs">ID: {item.id.substring(0, 8)}...</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.weight} g</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">€{Number(item.value).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-800">
                        <td className="px-6 py-3 text-sm font-medium">Totals</td>
                        <td className="px-6 py-3 text-sm font-medium">
                          {shippingData.order_lines.reduce((sum, item) => sum + item.quantity, 0)}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium">
                          {shippingData.order_lines.reduce((sum, item) => sum + item.weight, 0)} g
                        </td>
                        <td className="px-6 py-3 text-sm font-medium">
                          €{shippingData.order_lines.reduce((sum, item) => sum + Number(item.value), 0).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'trackTrace' && (
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                  {/* Header with carrier logo and name */}
                  <div className="p-5 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-500 p-2 rounded-lg">
                          <Truck className="text-black" size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{shippingData?.track_and_trace_details.carrier_name}</h3>
                          <p className="text-gray-400 text-sm">Carrier Code: {shippingData?.track_and_trace_details.carrier_code}</p>
                        </div>
                      </div>
                      <div className="bg-gray-800 text-yellow-500 px-3 py-1 rounded-full text-xs font-medium">
                        Active
                      </div>
                    </div>
                  </div>

                  {/* Tracking details */}
                  <div className="p-5">
                    <h4 className="text-gray-400 text-sm font-medium mb-2">Tracking Number</h4>
                    <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg mb-5">
                      <div className="font-mono text-white text-sm break-all">
                        {shippingData?.track_and_trace_details.track_and_trace_code}
                      </div>
                    </div>

                    {/* Latest status */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-5">
                      <h4 className="text-gray-400 text-sm mb-1">Latest Status</h4>
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-white">In Transit</p>
                      </div>
                      <div className="mt-2 text-gray-400 text-sm">
                        Last updated: April 30, 2025 at 10:44 AM
                      </div>
                    </div>

                    {/* Expected delivery */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-5">
                      <h4 className="text-gray-400 text-sm mb-1">Expected Delivery</h4>
                      <p className="text-white font-medium">May 2, 2025</p>
                      <p className="text-gray-400 text-sm">Between 9:00 AM - 6:00 PM</p>
                    </div>

                    {/* Delivery address snippet */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-5">
                      <h4 className="text-gray-400 text-sm mb-1">Delivery Address</h4>
                      <p className="text-white">Marconilaan 8, 6003 DD</p>
                      <p className="text-white">Weert, NL</p>
                    </div>

                    {/* Track button */}
                    <p className="text-gray-500 text-xs text-center mt-4">
                      Tracking information provided by {shippingData?.track_and_trace_details.carrier_name}.
                      Updates may take 24-48 hours to reflect current status.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}