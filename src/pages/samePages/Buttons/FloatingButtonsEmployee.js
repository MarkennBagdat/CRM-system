import React, { useState } from "react";
import { FloatButton, Form } from "antd";
import { PlusOutlined, WechatOutlined } from "@ant-design/icons";
import "../../../assets/styles/App.css";
import "../../../assets/styles/main.scss";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../Employees/Parts/EmployeeForm";

const FloatingButtonsDashboard = () => {
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

      <EmployeeForm
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedEmployees={[]} // Pass actual employee data as needed
        handleEmployeesChange={() => {}} 
      />
    </div>
  );
};

export default FloatingButtonsDashboard;
