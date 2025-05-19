import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { FaEye } from "react-icons/fa";
import { Card, Form, Input, Switch, Button, message, Radio } from "antd";
import { useGetMadeByIdQuery, useUpdateMadeMutation } from '../../../redux/apiSlices/madeSlice';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";

export default function EditMadeModal({ made, handleRefetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(made?.category);
  const [imgURL1, setImgURL1] = useState(null);
  const [imgURL2, setImgURL2] = useState();
  const [videoURL, setVideoURL] = useState();
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const videoRef = useRef(null);
  const [form] = Form.useForm();

  const [updateProduct, { isLoading }] = useUpdateMadeMutation();

  // console.log("made : ", made);

  const refactorFileUrl = (url) => {
    const fileUrl = url.startsWith("http") ? url : `${import.meta.env.VITE_BASE_URL}/${url}`;
    // console.log("fileUrl : ", fileUrl);
    return fileUrl;
  }

  useEffect(() => {
    made?.image1 && setImgURL1(refactorFileUrl(made?.image1)); // Set the cover image URL
    made?.image2 && setImgURL2(refactorFileUrl(made?.image2)); // Set the cover image URL
    made?.video && setVideoURL(refactorFileUrl(made?.video)); // Set the cover image URL
  }, []);

  const onChangeImage = (e) => {
    const selectedName = e.target.name;
    const selectedFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(selectedFile);
    if (selectedName === "image1") {
      setImgURL1(imgUrl);
      setImageFile1(selectedFile);
    }
    if (selectedName === "image2") {
      setImgURL2(imgUrl);
      setImageFile2(selectedFile);
    }
    if (selectedName === "video") {
      setVideoURL(imgUrl);
      setVideoFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("details", values.details);
      formData.append("category", values.category);
      if (category === "image") {
        formData.append("firstName", values.firstName);
        formData.append("secondName", values.secondName);
        imageFile1 && formData.append("image1", imageFile1);
        imageFile2 && formData.append("image2", imageFile2);
      }
      if (category === "video") {
        videoFile && formData.append("video", videoFile);
      }

      const response = await updateProduct({ id: made._id, data: formData });

      if (response.data) {
        toast.success("How to Made added successfully!");
        handleRefetch();
        // setIsOpen(false);
      } else {
        toast.error("Failed to add How to Made!");
      }
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };


  return (
    <div className="flex flex-col items-center">
      <Button onClick={() => setIsOpen(true)} type="outline" className="border border-white h-9 w-12">
        <FaEdit className="w-8 h-8 text-white" />
      </Button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-100 rounded-lg shadow-xl w-[900px] my-8">
            {/* Modal Header */}
            <div className="sticky top-0 rounded-t-lg bg-gray-700 text-white px-6 h-16 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className='w-full h-[calc(96vh-68px)] overflow-y-scroll scrollbar-hidden'>
              <div className="w-full gap-6 p-6">
                <div className='w-full'>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                      title: made?.title,
                      details: made?.details,
                      category: made?.category,
                      firstName: made?.firstName,
                      secondName: made?.secondName,
                    }}

                  >

                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ required: true, message: "Please input the Title!" }]}
                    >
                      <Input placeholder="Enter Title" />
                    </Form.Item>

                    <Form.Item
                      name="details"
                      label="Details"
                      rules={[{ required: true, message: "Please input the details!" }]}
                    >
                      <Input.TextArea placeholder="Enter Details" />
                    </Form.Item>

                    <Form.Item
                      name="category"
                      label="Category"
                    // onChange={(e) => setCategory(e.target.value)}
                    >
                      <Radio.Group disabled={true}>
                        <Radio value="text"> Text </Radio>
                        <Radio value="image"> Image </Radio>
                        <Radio value="video"> Video </Radio>
                      </Radio.Group>
                    </Form.Item>

                    {/* ------------ First & Second Name ------------ */}
                    {category === "image" && <div className="grid grid-cols-2 gap-4 mb-4">
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: "Please input the First Name!" }]}
                      >
                        <Input placeholder="Enter First Name" />
                      </Form.Item>

                      <Form.Item
                        name="secondName"
                        label="Second Name"
                        rules={[{ required: true, message: "Please input the Second Name!" }]}
                      >
                        <Input placeholder="Enter Second Name" />
                      </Form.Item>
                    </div>}

                    {/* ------------ Images ------------ */}
                    {category === "image" && <div className="grid grid-cols-2 gap-4 mb-4">
                      <div onClick={() => imgRef1.current.click()} className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-4bg-blue-300 cursor-pointer">
                        <input
                          onChange={onChangeImage}
                          type="file"
                          name="image1"
                          accept="image/*"
                          ref={imgRef1}
                          style={{ display: "none" }}
                        />
                        <div className="relative h-[300px] w-full ">
                          <img
                            src={imgURL1}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {!imgURL1 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500">Click to add image 1</p>}
                        </div>
                      </div>
                      <div onClick={() => imgRef2.current.click()} className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-4bg-blue-300 cursor-pointer">
                        <input
                          onChange={onChangeImage}
                          type="file"
                          name="image2"
                          accept="image/*"
                          ref={imgRef2}
                          style={{ display: "none" }}
                        />
                        <div className="relative h-[300px] w-full ">
                          <img
                            src={imgURL2}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {!imgURL2 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500">Click to add image 2</p>}
                        </div>
                      </div>
                    </div>}

                    {/* ------------ Videos ------------ */}
                    {category === "video" && <div className="mb-4">
                      <div className="w-full max-w-[600px] mx-auto space-y-2">
                        <div onClick={() => videoRef.current.click()} className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-500 rounded-lg py-2 px-4 cursor-pointer">
                          <p className="text-center">Click to add video</p>
                          <input
                            onChange={onChangeImage}
                            type="file"
                            ref={videoRef}
                            name="video"
                            accept="video/*"
                            className="py-4"
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className=" w-full ">
                          {videoURL && (
                            <video width="100%" height="100%" controls>
                              <source src={videoURL} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      </div>
                    </div>}

                    <Form.Item>
                      <Button type="outline" className="border border-gray-500" htmlType="submit">
                        Update Made
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}