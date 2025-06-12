import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Form, Input, Switch, Button, message, Radio } from "antd";
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";

import whiteBg from "../../../assets/whiteBG.png";
import { useUpdateProductMutation } from '../../../redux/apiSlices/productSlice';

// import toast from "react-hot-toast";


export default function EditProductModal({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [imgURL, setImgURL] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [lastImg, setLastImg] = useState(null);
  const [form] = Form.useForm();
  // const { id } = useParams(); // Get the product ID from URL

  // Fetch existing product data
  // const { data: product, isLoading: productLoading, refetch } = useGetProductByIdQuery(id); // Assuming you have this query in Redux slice
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    // console.log(product, "product");
    if (product) {
      form.setFieldsValue({
        name: product?.name,
        commonName: product?.commonName,
        scientificName: product?.scientificName,
        groupName: product?.groupName,
        details: product?.details,
        type: product?.type,
        diet: product?.diet,
        price: product?.price,
        stock: product?.stock,
        size: product?.size,
        weight: product?.weight,
        height: product?.height,
        length: product?.length,
        width: product?.width,
      });
      const imgUrl = product?.coverImage?.startsWith("http")
        ? product?.coverImage
        : `${import.meta.env.VITE_BASE_URL}/${product?.coverImage}`;

      // console.log("imgUrl : ", imgUrl);

      setImgURL(imgUrl); // Set the cover image URL
    }
  }, [product]);


  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const handleLastImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setLastImg(selectedFile);
    }
  };


  const handleImages = (e) => {
    const selectedFile = Array.from(e.target.files).map((file) => file);
    // console.log(selectedFile, "selectedFile");
    if (selectedFile.length > 0) {
      setFiles(selectedFile);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("commonName", values.commonName);
      formData.append("scientificName", values.scientificName);
      formData.append("groupName", values.groupName);
      formData.append("details", values.details);
      formData.append("type", values.type);
      formData.append("diet", values.diet);
      formData.append("price", values?.price);
      formData.append("stock", values.stock);
      formData.append("size", values.size);
      formData.append("weight", values.weight);
      formData.append("height", values.height);
      formData.append("length", values.length);
      formData.append("width", values.width);

      // Add cover image to FormData
      if (file) {
        formData.append("coverImage", file);
      }
      
      if (lastImg) {
        formData.append("lastImage", lastImg);
      }

      // Include the image file as 'images'
      if (files && files.length > 0) {
        files.forEach((file) => formData.append("images", file));
      }

      // If product ID exists, it's an update; otherwise, it's a new product.
      const data = formData;
      const response = await updateProduct({ id: product?._id, data });

      if (response?.data) {
        toast.success("Product updated successfully!");
        refetch();
        // navigate("/products");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <Button onClick={() => setIsOpen(true)} type="outline" className="border border-white h-9 w-12">
        <FaEdit className="w-8 h-8 text-white" />
      </Button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-100 rounded-lg shadow-xl w-[900px]">
            <div className="sticky top-0 rounded-t-lg bg-gray-700 text-white px-6 h-16 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className='max-h-[82vh] overflow-y-auto py-8 px-4'>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the Name!" }]}>
                    <Input placeholder="Enter Product Name" />
                  </Form.Item>

                  <Form.Item name="commonName" label="Common Name" rules={[{ required: true, message: "Please input the Common Name!" }]}>
                    <Input placeholder="Enter Product Common Name" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Form.Item name="scientificName" label="Scientific Name" rules={[{ required: true, message: "Please input the Scientific Name!" }]}>
                    <Input placeholder="Enter Product Scientific Name" />
                  </Form.Item>

                  <Form.Item name="groupName" label="Group Name" rules={[{ required: true, message: "Please input the Group Name!" }]}>
                    <Input placeholder="Enter Product Group Name" />
                  </Form.Item>
                </div>

                <Form.Item name="details" label="Details" rules={[{ required: true, message: "Please input the details!" }]}>
                  <Input.TextArea placeholder="Enter Product Details" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Form.Item name="type" label="Type" rules={[{ required: true, message: "Please input the Type!" }]}>
                    <Input placeholder="Enter Product Type" />
                  </Form.Item>

                  <Form.Item name="diet" label="Diet" rules={[{ required: true, message: "Please input the Diet!" }]}>
                    <Input placeholder="Enter Product Diet" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-4">
                  <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the Price!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Price" />
                  </Form.Item>

                  <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please input the Stock!" }]}>
                    <Input type="number" min={0} step={1} placeholder="Enter Product Stock" />
                  </Form.Item>

                  <Form.Item name="size" label="Size" rules={[{ required: true, message: "Please input the Size!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Size" />
                  </Form.Item>

                  <Form.Item name="weight" label="Weight" rules={[{ required: true, message: "Please input the Weight!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Weight" />
                  </Form.Item>

                  <Form.Item name="height" label="Height" rules={[{ required: true, message: "Please input the Height!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Height" />
                  </Form.Item>

                  <Form.Item name="length" label="Length" rules={[{ required: true, message: "Please input the Length!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Length" />
                  </Form.Item>

                  <Form.Item name="width" label="Width" rules={[{ required: true, message: "Please input the Width!" }]}>
                    <Input type="number" min={0} step={"any"} placeholder="Enter Product Width" />
                  </Form.Item>
                </div>

                {/* ------------ Product Images ------------ */}
                <div className="flex items-center mb-6 gap-2">
                  <label htmlFor="multipleImg">Images: </label>
                  <input onChange={handleImages} type="file" accept='image/*' multiple id="multipleImg" />
                  <div className="flex flex-wrap my-2 gap-1">
                    {
                      product?.images && product?.images?.length > 0 ? (
                        product?.images?.map((file, index) => (
                          <img
                            key={index}
                            src={`${import.meta.env.VITE_BASE_URL}/${file}`}
                            alt={`Product Image ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ))
                      ) : (
                        <p>No images selected</p>
                      )
                    }
                  </div>
                </div>

                {/* ------------ Product Last Images ------------ */}
                <div className="flex items-center mb-6 gap-2">
                  <label htmlFor="lastImg">Last Image: </label>
                  <input onChange={handleLastImage} type="file" id="lastImg" />
                  <div className="flex flex-wrap my-2 gap-1">
                    {
                      product?.lastImage && (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/${product?.lastImage}`}
                          alt={`Product Last Image`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )
                    }
                  </div>
                </div>


                {/* ------------ Product Cover Image ------------ */}
                <div className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-4">
                  <input ref={inputRef} onChange={onChangeImage} type="file" accept='image/*' id="img" style={{ display: "none" }} />
                  <div onClick={() => inputRef.current.click()} className="cursor-pointer">
                    <img src={imgURL ? imgURL : whiteBg} alt="Cover" className="w-80 h-60 object-cover rounded-md" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Click to upload cover image</p>
                </div>


                <Form.Item>
                  <Button type="outline" className="border border-gray-500" htmlType="submit">
                    Update Product
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}