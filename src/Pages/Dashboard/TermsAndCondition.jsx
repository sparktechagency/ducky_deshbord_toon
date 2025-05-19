/* eslint-disable no-unused-vars */
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useScreenQuery, useUpdateScreenMutation } from "../../redux/apiSlices/screenSlice";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getTermsOfService,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useScreenQuery();

  // console.log("Privacy Policy", getTermsOfService);
  
  const [updatePricyPolicy, { isLoading: isUpdating }] = useUpdateScreenMutation();

  useEffect(() => {
    if (getTermsOfService?.termsOfService) {
      setContent(getTermsOfService?.termsOfService);
    }
  }, [getTermsOfService]);

  const handleOnSave = async () => {
    try {
      await updatePricyPolicy({ termsOfService: content }).unwrap();
      toast.success("Terms & Condition updated successfully!");
      // alert("Privacy Policy updated successfully!");
      // console.log("Privacy Policy updated successfully!!!");
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save Terms & Condition. Please try again.");
      // console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Terms & Condition..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms & Condition. Please try again later.
      </div>
    );
  }


  return (
    <div className="py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4 text-white">
          Terms & Conditions
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

export default TermsAndCondition;