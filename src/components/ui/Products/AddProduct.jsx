import { Card, Form, Input, Switch, Button, message } from "antd";
import { useState } from "react";
import whiteBg from "../../../assets/whiteBG.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../redux/apiSlices/productSlice";
import { set } from "react-hook-form";

const AddProduct = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [addProduct, { isLoading }] = useAddProductMutation();

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
      // console.log(selectedFile, "selectedFile");
    }
  };
  const handleImages = (e) => {
    const selectedFile = Array.from(e.target.files).map((file) => file);
    console.log(selectedFile, "selectedFile");
    if (selectedFile.length > 0) {
      setFiles(selectedFile);
    }
  };

  const onFinish = async (values) => {
    // console.log(values.price, "price");

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("commonName", values.commonName);
      formData.append("scientificName", values.scientificName);
      formData.append("groupName", values.groupName);
      formData.append("details", values.details);
      formData.append("type", values.type);
      formData.append("diet", values.diet);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("size", values.size);
      formData.append("weight", values.weight);
      formData.append("height", values.height);
      formData.append("length", values.length);
      formData.append("width", values.width);


      // Include the image file as 'images'
      if (files && files.length > 0) {
        files.forEach((file) => formData.append("images", file));
      } else {
        message.error("At least upload one product image.");
        return;
      }

      // Include the image file as 'image'
      if (file) {
        formData.append("coverImage", file);
      } else {
        message.error("Upload product cover image.");
        return;
      }

      const response = await addProduct(formData);

      if (response.data) {
        toast.success(response?.data?.message);
        navigate("/products");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card title={<div className="flex justify-between">
      <p>Add Product</p>
      <Link to="/products" className="text-gray-700">Go Back</Link>
    </div>} style={{ width: 1000, margin: "0 auto", }} className="bg-gray-200 shadow-md rounded-lg p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the Name!" }]}
          >
            <Input placeholder="Enter Product Name" />
          </Form.Item>

          <Form.Item
            name="commonName"
            label="Common Name"
            rules={[{ required: true, message: "Please input the Common Name!" }]}
          >
            <Input placeholder="Enter Product Common Name" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item
            name="scientificName"
            label="Scientific Name"
            rules={[{ required: true, message: "Please input the Scientific Name!" }]}
          >
            <Input placeholder="Enter Product Scientific Name" />
          </Form.Item>

          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[{ required: true, message: "Please input the Group Name!" }]}
          >
            <Input placeholder="Enter Product Group Name" />
          </Form.Item>
        </div>

        <Form.Item
          name="details"
          label="Details"
          rules={[{ required: true, message: "Please input the details!" }]}
        >
          <Input.TextArea placeholder="Enter Product Details" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please input the Type!" }]}
          >
            <Input placeholder="Enter Product Type" />
          </Form.Item>

          <Form.Item
            name="diet"
            label="Diet"
            rules={[{ required: true, message: "Please input the Diet!" }]}
          >
            <Input placeholder="Enter Product Diet" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the Price!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Price" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input the Stock!" }]}
          >
            <Input type="number" min={0} step={1} placeholder="Enter Product Stock" />
          </Form.Item>

          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Please input the Size!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Size" />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            rules={[{ required: true, message: "Please input the Weight!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Weight" />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height"
            rules={[{ required: true, message: "Please input the Height!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Height" />
          </Form.Item>

          <Form.Item
            name="length"
            label="Length"
            rules={[{ required: true, message: "Please input the Length!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Length" />
          </Form.Item>

          <Form.Item
            name="width"
            label="Width"
            rules={[{ required: true, message: "Please input the Width!" }]}
          >
            <Input type="number" min={0} step={"any"} placeholder="Enter Product Width" />
          </Form.Item>
        </div>


        {/* ------------ Product Images ------------ */}
        <div className="flex items-center mb-6 gap-2">
          <label
            htmlFor="multipleImg"
            className=""
          >Product Images: </label>
          <input
            onChange={handleImages}
            accept="image/*"
            type="file"
            multiple
            id="multipleImg"
          />
        </div>

        {/* ------------ Product Cover Image ------------ */}
        <div className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-4">
          <input
            onChange={onChangeImage}
            type="file"
            accept="image/*"
            id="img"
            style={{ display: "none" }}
          />
          <label
            htmlFor="img"
            className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundImage: `url(${imgURL ? imgURL : whiteBg})`,
            }}
          >
            {!imgURL && (
              <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MdOutlineAddPhotoAlternate
                  size={60}
                  className="text-gray-600"
                />
              </div>
            )}
          </label>
          <p className="mt-2 text-sm text-gray-500">Click to upload cover image</p>
        </div>

        <Form.Item>
          <Button type="outline" className="border border-gray-500" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProduct;
