import React, { useState, useEffect } from "react";
import { Table, Input, Layout, message, Button } from "antd";
import axios from "axios";
import moment from "moment";
import SearchPanel from "./SearchPanel";
import FloatingButtonsInventory from "../samePages/Buttons/FloatingButtonsInventory";
import InventoryForm from "./InventoryForm";
import InventoryDetailsForm from "./InventoryDetailsForm";

const { Content } = Layout;

const InventoryComponent = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8085/v1/warehouse", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventoryData(response.data || []);
      setFilteredData(response.data || []);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      message.error("Failed to fetch inventory data.");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = inventoryData.filter(
      (item) =>
        item.Type.toLowerCase().includes(value.toLowerCase()) ||
        item.Name.toLowerCase().includes(value.toLowerCase()) ||
        item.MeasurementType.toLowerCase().includes(value.toLowerCase()) ||
        item.Supplier.toLowerCase().includes(value.toLowerCase()) ||
        item.ExpirationTime.toLowerCase().includes(value.toLowerCase()) ||
        item.Note.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleUpdateService = async (updatedItem) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`http://localhost:8085/v1/warehouse/${updatedItem.ID}`, updatedItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInventoryData(); // Refresh the data after updating
      message.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Failed to update product.");
    }
  };

  const handleAddService = async (newItem) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post("http://localhost:8085/v1/warehouse", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInventoryData(); // Refresh the data after adding
      message.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    }
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const totalSum = (inventoryData || []).reduce((sum, item) => {
    return sum + (item.Amount * item.Count || 0);
  }, 0);

  const inventoryColumns = [
    {
      title: "Наименование товара",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Название",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Количество",
      dataIndex: "Count",
      key: "Count",
    },
    {
      title: "Ед. измерения",
      dataIndex: "MeasurementType",
      key: "MeasurementType",
    },
    {
      title: "Сумма, тг",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Поставщик",
      dataIndex: "Supplier",
      key: "Supplier",
    },
    {
      title: "Срок годности",
      dataIndex: "ExpirationTime",
      key: "ExpirationTime",
      render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "N/A"),
    },
    {
      title: "Примечание",
      dataIndex: "Note",
      key: "Note",
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setSelectedItem(record);
              setIsEditing(true);
              setIsModalVisible(true);
            }}
          >
            Ред.
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <SearchPanel onSearch={handleSearch} />
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={inventoryColumns}
            pagination={false}
            rowKey="ID"
          />
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
            <span style={{ marginRight: "8px" }}>Сумма, тг:</span>
            <Input value={totalSum.toFixed(2)} readOnly style={{ width: "150px" }} />
          </div>
          <FloatingButtonsInventory
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setIsEditing={setIsEditing}
          />
        </div>
      </Content>
      {isModalVisible && isEditing && (
        <InventoryDetailsForm
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          selectedItem={selectedItem}
          onUpdateService={handleUpdateService}
          fetchInventoryData={fetchInventoryData}
        />
      )}
      {isModalVisible && !isEditing && (
        <InventoryForm
          setIsModalVisible={setIsModalVisible}
          fetchInventoryData={fetchInventoryData}
          onAddService={handleAddService}
        />
      )}
    </Layout>
  );
};

export default InventoryComponent;
