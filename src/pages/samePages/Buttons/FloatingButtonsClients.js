import React, { useState } from "react";
import { FloatButton, Form} from "antd";
import { PlusOutlined, WechatOutlined } from "@ant-design/icons";
import ClientsForm from "../../Clients/component/ClientsForm";
import { useNavigate } from "react-router-dom";

const FloatingButtonsClients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const form = Form.useForm()[0]; // Assuming you initialize the form here
  const navigate = useNavigate();

  const onChatClick = () => {
    navigate("/help");
  };

  const addRecord = () => {
    setIsModalVisible(true);
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
      
      <ClientsForm
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedEmployees={[]} // Pass actual employee data as needed
        handleEmployeesChange={() => {}} 
      />
    </div>
  );
};

export default FloatingButtonsClients;
