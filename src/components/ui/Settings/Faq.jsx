import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import FaqModal from "../../ui/FAQ/FaqModal";
import { useDeleteFaqMutation, useFaqsQuery } from "../../../redux/apiSlices/faqSlice";

const Faq = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState(null);

  const {data:allFaq, isLoading, refetch} = useFaqsQuery();
  const [deleteFaq] = useDeleteFaqMutation();

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  const handleDelete = async (id) => {
    // Handle delete logic here
    await deleteFaq(id)
      .unwrap()
      .then((res) => {
        console.log("FAQ deleted successfully:", res);
      })
      .catch((error) => {
        console.error("Error deleting FAQ:", error);
      });
    refetch();
  };

  const closeModal = () => {
    setOpenAddModel(false);
    setModalData(null);
    refetch();
  }



  return (
    <div className="">
      <div className=" mb-4 flex justify-between items-center w-full">
        <button
          onClick={() => setOpenAddModel(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-black rounded hover:bg-secondary hover:text-black transition-colors"
        >
          <FaPlus />
          Add FAQ
        </button>
      </div>

      <div className=" pb-6 rounded-md">
        {allFaq?.data?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-4 py-4 px-4 rounded bg-black mb-3"
          >
            <GoQuestion color="#8b0000" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                <span className="flex-1 text-gray-400">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2 px-4 mt-4">
                <p className="text-gray-500 leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
                  setModalData(item);
                }}
                className="text-2xl cursor-pointer text-[#00809E]"
              />
              <RxCross2
                onClick={() => handleDelete(item?._id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>

      <FaqModal
        setOpenAddModel={setOpenAddModel}
        openAddModel={openAddModel}
        modalData={modalData}
        setModalData={setModalData}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Faq;
