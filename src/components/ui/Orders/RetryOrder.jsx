import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Form, Input, Button } from "antd";
import { useUpdateMadeMutation } from '../../../redux/apiSlices/madeSlice';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { useRequestShippingMutation, useRetryOrderMutation } from '../../../redux/apiSlices/orderSlice';
import { RiLoopLeftFill } from "react-icons/ri";

export default function RetryOrderModal({ order, handleRefetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [displayOption, setDisplayOption] = useState('orderComponent');

  // console.log(order);

  const [retryOrder, { isLoading }] = useRetryOrderMutation();
  const [requestShipping] = useRequestShippingMutation();

  const handleShippingRequest = async () => {
    const response = await requestShipping(order._id);
    // console.log(response)
    if (response?.data) {
      toast.success("Shipping request sent successfully!");
      handleRefetch();
      setIsOpen(false);
    }
  }

  const onFinish = async (values) => {
    // console.log(order);
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("phone_number", values.phone_number);
      formData.append("zip_code", values.zip_code);
      formData.append("street_name", values.street_name);
      formData.append("state_code", values.state_code);
      formData.append("locality", values.locality);
      formData.append("house_number", values.house_number);
      formData.append("given_name", values.given_name);
      formData.append("family_name", values.family_name);
      formData.append("country", values.country);
      formData.append("business", values.business);
      formData.append("address2", values.address2);


      const response = await retryOrder({ id: order._id, data: formData });

      if (response.data) {
        toast.success("Order generated successfully!");
        handleRefetch();
        setDisplayOption('shipmentComponent');
        // setIsOpen(false);
      } else {
        toast.error("Failed to generate order!");
      }
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <Button onClick={() => setIsOpen(true)} type="outline" className="border border-white h-9 w-12">
        <RiLoopLeftFill className="w-8 h-8 text-white" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-gray-100 rounded-lg shadow-xl w-[600px] my-8">
            {/* Modal Header */}
            <div className="sticky top-0 rounded-t-lg bg-gray-700 text-white px-6 h-16 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Update Status</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {displayOption === 'orderComponent' && <div className='w-full h-[calc(96vh-68px)] overflow-y-scroll scrollbar-hidden'>
              <div className="w-full gap-6 p-6">
                <div className='w-full'>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                      phone_number: order?.phone_number,
                      zip_code: order?.zip_code,
                      street_name: order?.street_name,
                      state_code: order?.state_code,
                      locality: order?.locality,
                      house_number: order?.house_number,
                      given_name: order?.given_name,
                      family_name: order?.family_name,
                      country: order?.country,
                      business: order?.business,
                      address2: order?.address2,
                    }}
                  >

                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[{ required: true, message: "Please Enter Your Phone Number!" }]}
                    >
                      <Input placeholder="Enter Phone Number" />
                    </Form.Item>

                    <Form.Item
                      name="zip_code"
                      label="Zip Code"
                      rules={[{ required: true, message: "Please enter your zip code!" }]}
                    >
                      <Input placeholder="Enter Zip Code" />
                    </Form.Item>

                    <Form.Item
                      name="street_name"
                      label="Street Name"
                      rules={[{ required: true, message: "Please enter street name!" }]}
                    >
                      <Input placeholder="Enter Street Name" />
                    </Form.Item>

                    <Form.Item
                      name="state_code"
                      label="State Code"
                      rules={[{ required: true, message: "Please enter your state code!" }]}
                    >
                      <Input placeholder="Enter State Code" />
                    </Form.Item>

                    <Form.Item
                      name="locality"
                      label="Locality"
                      rules={[{ required: true, message: "Please enter your locality!" }]}
                    >
                      <Input placeholder="Enter Locality" />
                    </Form.Item>

                    <Form.Item
                      name="house_number"
                      label="House Number"
                      rules={[{ required: true, message: "Please enter your house number!" }]}
                    >
                      <Input placeholder="Enter House Number" />
                    </Form.Item>

                    <Form.Item
                      name="given_name"
                      label="Given Name"
                      rules={[{ required: true, message: "Please enter your given name!" }]}
                    >
                      <Input placeholder="Enter given name" />
                    </Form.Item>

                    <Form.Item
                      name="family_name"
                      label="Family Name"
                      rules={[{ required: true, message: "Please enter your Family Name!" }]}
                    >
                      <Input placeholder="Enter Family Name" />
                    </Form.Item>

                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[{ required: true, message: "Please enter your country!" }]}
                    >
                      <Input placeholder="Enter country" />
                    </Form.Item>

                    <Form.Item
                      name="business"
                      label="Business"
                      rules={[{ required: true, message: "Please enter your business!" }]}
                    >
                      <Input placeholder="Example Business Ltd." />
                    </Form.Item>

                    <Form.Item
                      name="address2"
                      label="Address"
                      rules={[{ required: true, message: "Please enter your address!" }]}
                    >
                      <Input placeholder="Enter address" />
                    </Form.Item>

                    <div className="flex items-center justify-end gap-4">
                      <Button type="outline" className="border border-gray-500" htmlType="submit">
                        Update
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>} 
            {displayOption === "shipmentComponent" && <div className='py-10 flex items-center justify-center'>
              <Button onClick={handleShippingRequest} type="outline" className="border border-gray-500">
                Shipment
              </Button>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}