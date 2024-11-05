import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import DateNavigation from "../DateNavigationInWork";
import axios from "axios";

const columns = (handleUpdateRecord, onRecordClick, employees) => [
  {
    title: "Номер записи",
    key: "index",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Время начала",
    dataIndex: "CreatedAt",
    key: "CreatedAt",
    render: (text) =>
      new Date(text).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  { title: "Марка", dataIndex: "Brand", key: "Brand" },
  { title: "Бокс", dataIndex: "Box", key: "Box" },
  { title: "Номер", dataIndex: "CarNumber", key: "CarNumber" },
  {
    title: "Сотрудник",
    dataIndex: "EmployeeId",
    key: "EmployeeId",
    render: (employeeId) => {
      const employee = employees.find((emp) => emp.id === employeeId);
      return employee
        ? `${employee.first_name} ${employee.last_name}`
        : "Неизвестно";
    },
  },
  { title: "Сумма", dataIndex: "Cost", key: "Cost" },
  {
    title: "Действие",
    key: "action",
    render: (text, record) => (
      <>
        <Button
          onClick={() => handleUpdateRecord({ ...record, Type: "Completed" })}
          style={{ border: "none", color: "blue" }}
        >
          Завершить
        </Button>
      </>
    ),
  },
];

const InWork = ({
  data,
  date,
  setDate,
  view,
  setView,
  handleUpdateRecord,
  onRecordClick,
}) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8084/v1/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter data by selected date
  const filteredData = data.filter(
    (record) =>
      new Date(record.CreatedAt).toLocaleDateString("ru-RU") ===
      new Date(date).toLocaleDateString("ru-RU")
  );

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <DateNavigation currentDate={date} setCurrentDate={setDate} />
      </div>
      <Table
        dataSource={sortedData}
        columns={columns(handleUpdateRecord, onRecordClick, employees)}
        rowKey="Id"
        onRow={(record) => ({
          onClick: () => onRecordClick(record),
        })}
      />
    </div>
  );
};

export default InWork;