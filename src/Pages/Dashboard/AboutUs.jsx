/* eslint-disable no-unused-vars */
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useScreenQuery, useUpdateScreenMutation } from "../../redux/apiSlices/screenSlice";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getAboutUs,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useScreenQuery();

  // console.log("About Us", getAboutUs);
  
  const [updatePricyPolicy, { isLoading: isUpdating }] = useUpdateScreenMutation();

  useEffect(() => {
    if (getAboutUs?.aboutUs) {
      setContent(getAboutUs?.aboutUs);
    }
  }, [getAboutUs]);

  const handleOnSave = async () => {
    try {
      await updatePricyPolicy({ aboutUs: content }).unwrap();
      toast.success("About Us updated successfully!");
      // alert("About Us updated successfully!");
      // console.log("About Us updated successfully!!!");
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save About Us. Please try again.");
      // console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading About Us..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading About Us. Please try again later.
      </div>
    );
  }


  return (
    <div className="py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4 text-white">
          About Us
        </h1>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ theme: "dark", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleOnSave}  className="inline-block w-100 px-10 py-2 bg-black hover:bg-gray-700 text-white border border-gray-400 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;