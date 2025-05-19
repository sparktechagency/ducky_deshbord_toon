import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useNewFaqMutation, useUpdateFaqMutation } from "../../../redux/apiSlices/faqSlice";

const FaqModal = ({
  setModalData,
  modalData,
  openAddModel,
  setOpenAddModel,
  closeModal
}) => {
  const [form] = Form.useForm();
  const [updateFaq] = useUpdateFaqMutation();
  const [newFaq] = useNewFaqMutation();

  useEffect(() => {
    if (modalData) {
      form.setFieldsValue({
        question: modalData?.question,
        answer: modalData?.answer,
      });
    }
  }, [modalData]);

  const onFinish = async(values) => {
    // console.log(values);
    if (modalData) {
      // Update FAQ logic here
      console.log("Update FAQ:", values);
      await updateFaq({id: modalData?._id, data: values})
        .unwrap()
        .then((res) => {
          console.log("FAQ updated successfully:", res);
        })
        .catch((error) => {
          console.error("Error updating FAQ:", error);
        });
      
    } else {
      // Add FAQ logic here
      console.log("Add FAQ:", values);
      await newFaq(values)
        .unwrap()
        .then((res) => {
          console.log("FAQ added successfully:", res);
        })
        .catch((error) => {
          console.error("Error adding FAQ:", error);
        });

    }
    closeModal();
  };

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        setOpenAddModel(false);
        setModalData(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
      styles={{backgroundColor: "black"}}
      className=""
    >
      <div className="">
        <h1
          className=" text-[20px] font-medium"
          style={{ marginBottom: "12px" }}
        >
          {modalData ? "Update FAQ" : "Add FAQ"}
        </h1>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            name="question"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Question</p>}
          >
            <Input
              type="Text"
              placeholder="Enter Question"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="answer"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Answer</p>}
          >
            <Input.TextArea
              type="Text"
              placeholder="Enter answer"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "152px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item className=" text-end">
            <button
              type="primary"
              htmlType="submit"
              className="bg-black text-white w-[120px] h-[42px] rounded-lg"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FaqModal;
