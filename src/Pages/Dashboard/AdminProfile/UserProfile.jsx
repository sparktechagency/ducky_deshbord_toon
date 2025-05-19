import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import "react-phone-input-2/lib/style.css";
import {
  useFetchAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "../../../redux/apiSlices/authSlice";
import logo from "../../../assets/randomProfile2.jpg";
import toast from "react-hot-toast";
import rentMeLogo from "../../../assets/navLogo.png";

const baseUrl = import.meta.env.VITE_BASE_URL;

const PersonalInfo = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const { data: fetchAdminProfile, isLoading, refetch} = useFetchAdminProfileQuery();


  const adminData = fetchAdminProfile?.data;

  const refactorFileUrl = (url) => {
    const fileUrl = url?.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    return fileUrl;
  }

  useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        fullName: adminData?.fullName,
        email: adminData?.email,
        address: adminData?.address,
        phone: adminData?.phone,
      });
      setImgURL(refactorFileUrl(adminData?.image));
    }
  }, [adminData, form]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }


  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("phone", values.phone);

      if (file) {
        formData.append("image", file);
      }

      const response = await updateAdminProfile(formData);

      if (response.data) {
        toast.success(response?.data?.message);
        refetch();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Error updating form:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Link to="/" className="flex items-center gap-[2px] text-base rounded-lg">
        <span>
          <BiLeftArrowAlt size={22} />
        </span>
        <span>Back</span>
      </Link>
      <div className="flex bg-white p-10 mt-10 rounded-2xl border gap-10 w-full">
        <div className="w-8/12">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="fullName"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: "email", message: "Please enter a valid email" },
                { required: true, message: "Please enter your email" },
              ]}
            >
              <Input readOnly className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your Address" }]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                block
                style={{
                  width: 178,
                  height: 48,
                  fontWeight: "400px",
                  background: "#000000",
                  color: "white",
                }}
                className="roboto-medium mt-10 text-sm leading-4"
              >
                Save and Change
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div className="flex flex-col items-center gap-10 bg-slate-100 px-20 py-12 mt-8 rounded-xl justify-center">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="relative w-48 h-48 cursor-pointer rounded-full border border-gray-300 bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${imgURL ? imgURL : logo})` }}
            >
              <span className="absolute bottom-4 right-1 w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate
                  size={16}
                  className="text-gray-700"
                />
              </span>
            </label>
            <div className="text-center">
              <h1 className="text-xl">{adminData?.fullName}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
