import React, { useState } from "react";
import { FloatButton, Form } from "antd";
import { PlusOutlined, WechatOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/App.css";
import "../../../assets/styles/main.scss";
import ServiceBookingForm from "../../Dashboard/components/ServiceBookingForm";

const FloatingButtonsDashboard = ({ handleAddRecord }) => { // Destructure handleAddRecord here
  const [isModalVisible, setIsModalVisible] = useState(false);
  const form = Form.useForm()[0]; // Assuming you initialize the form here
  const navigate = useNavigate();

  const addRecord = () => {
    setIsModalVisible(true);
  };

  const onChatClick = () => {
    navigate("/help");
  };

  return (
    <div className="bothButton">
      <FloatButton
        icon={<PlusOutlined />}
        type="default"
        className="samebutton formbutton"
        style={{ right: 110 }}
        onClick={addRecord}
      />
      <FloatButton
        icon={<WechatOutlined />}
        type="default"
        className="samebutton"
        style={{ right: 20 }}
        onClick={onChatClick}
      />

      <ServiceBookingForm
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedEmployees={[]} // Pass actual employee data as needed
        handleEmployeesChange={() => {}}
        handleAddRecord={handleAddRecord} // Ensure this is passed correctly
      />
    </div>
  );
};

export default FloatingButtonsDashboard;
