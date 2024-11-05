import React, { useState } from "react";
import { FloatButton, Modal} from "antd";
import { PlusOutlined, WechatOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/App.css";
import "../../../assets/styles/main.scss";
import InventoryForm from "../../Inventory/InventoryForm";

const FloatingButtonsInventory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const addRecord = () => {
    setIsModalVisible(true);
  };

  const onChatClick = () => {
    navigate("/help");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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

      <Modal
        title="Добавить товар"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
      >
        <InventoryForm setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  );
};

export default FloatingButtonsInventory;
