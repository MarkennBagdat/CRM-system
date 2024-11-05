import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Tabs, message } from "antd";
import moment from "moment";
import "./App.css";
import "moment/locale/kk";
import FloatingButtonsDashboard from "../samePages/Buttons/FloatingButtonsDashboard";
import InWork from "./components/Indiviadual/InWork";
import Planned from "./components/Indiviadual/Planned";
import Completed from "./components/Indiviadual/Completed";

moment.locale("kk");

const { Content } = Layout;
const { TabPane } = Tabs;

const items = [
  { key: "1", label: "В работе" },
  { key: "2", label: "Запланированные" },
  { key: "3", label: "Завершенные" },
];

const getTabStyle = (isSelected) => ({
  color: isSelected ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Dashboard = () => {
  const [date, setDate] = useState(moment());
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found!");
      return;
    }
    try {
      const [ordersResponse, employeesResponse, clientsResponse] = await Promise.all([
        axios.get("http://localhost:8081/v1/calendar/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8084/v1/employees", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8082/v1/clients", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      setData(ordersResponse.data);
      setEmployees(employeesResponse.data);
      setClients(clientsResponse.data)
    } catch (error) {
      console.error("There was an error fetching the records or employees!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleAddRecord = (newRecord) => {
    setData((prevData) => [...prevData, newRecord]);
    message.success("Запись успешно добавлена!");
  };

  const handleUpdateRecord = async (updatedRecord) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:8081/v1/calendar/orders/${updatedRecord.Id}`,
        updatedRecord,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prevData) =>
        prevData.map((record) =>
          record.Id === updatedRecord.Id ? updatedRecord : record
        )
      );
      message.success("Запись успешно обновлена!");
    } catch (error) {
      console.error("Error updating record:", error);
      message.error("Ошибка при обновлении записи.");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8081/v1/calendar/orders/${recordId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((record) => record.Id !== recordId));
      message.success("Запись успешно удалена!");
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Ошибка при удалении записи.");
    }
  };

  const onChatClick = () => {};

  const handleRecordClick = (record) => {
    setIsModalVisible(true);
  };

  const getTabContent = (key) => {
    switch (key) {
      case "1":
        return (
          <InWork
            data={data.filter((item) => item.Type === "Started")}
            employees={employees}
            date={date}
            setDate={setDate}
            handleUpdateRecord={handleUpdateRecord}
            handleDeleteRecord={handleDeleteRecord}
            onRecordClick={handleRecordClick}
          />
        );
      case "2":
        return (
          <Planned
            data={data.filter((item) => item.Type === "Planned")}
            date={date}
            setDate={setDate}
            handleUpdateRecord={handleUpdateRecord}
            handleDeleteRecord={handleDeleteRecord}
            onRecordClick={handleRecordClick}
          />
        );
      case "3":
        return (
          <Completed
            data={data.filter((item) => item.Type === "Completed")}
            date={date}
            setDate={setDate}
            handleUpdateRecord={handleUpdateRecord}
            handleDeleteRecord={handleDeleteRecord}
            onRecordClick={handleRecordClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Content>
      <div>
        <Tabs
          activeKey={activeTabKey}
          onChange={handleTabChange}
          style={{ fontSize: "14px", fontWeight: "400" }}
        >
          {items.map((item) => (
            <TabPane
              tab={<span style={getTabStyle(activeTabKey === item.key)}>{item.label}</span>}
              key={item.key}
            />
          ))}
        </Tabs>
        {getTabContent(activeTabKey)}
        <div style={{ marginTop: "24px", backgroundColor: "#fff", padding: "16px" }} />
        <FloatingButtonsDashboard
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onChatClick={onChatClick}
          handleAddRecord={handleAddRecord}
        />
      </div>
    </Content>
  );
};

export default Dashboard;
