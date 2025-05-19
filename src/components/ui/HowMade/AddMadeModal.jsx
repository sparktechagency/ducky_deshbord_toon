import { Card, Form, Input, Switch, Button, message, Radio } from "antd";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useAddMadeMutation } from "../../../redux/apiSlices/madeSlice";
// import { set } from "react-hook-form";

const AddMadeModal = () => {
  const [category, setCategory] = useState("text");
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
  const navigate = useNavigate();

  const [addMade, { isLoading }] = useAddMadeMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

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
        formData.append("image1", imageFile1);
        formData.append("image2", imageFile2);
      }
      if (category === "video") {
        formData.append("video", videoFile);
      }

      const response = await addMade(formData);

      if (response.data) {
        toast.success("How to Made added successfully!");
        navigate("/how-to-made");
      } else {
        toast.error("Failed to add How to Made!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card title="Add How to Made" style={{ width: 1000, margin: "0 auto", }} className="bg-gray-200 shadow-md rounded-lg p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          category: category, // Set the initial value for the category field
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
          <Input.TextArea placeholder="Enter  Details" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <Radio.Group>
            <Radio value="text"> Text </Radio>
            <Radio value="image"> Image </Radio>
            <Radio value="video"> Video </Radio>
          </Radio.Group>
        </Form.Item>

        {/* ------------ First and Second Name ------------ */}
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
            Add Made
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddMadeModal;
