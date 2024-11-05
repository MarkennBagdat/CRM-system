import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Checkbox,
  DatePicker,
  Button,
  Space,
  message,
} from "antd";
import FloatingButtonsEmployee from "../../samePages/Buttons/FloatingButtonsEmployee";
import SearchPanel from "./SearchPanel";
import moment from "moment";
import axios from "axios";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import EmployeeForm from "./EmployeeForm"; // Import the EmployeeForm component

const { Search } = Input;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Владелец автосервиса", "Менеджер филиала", "Мойщик"];
const defaultCheckedList = [
  "Владелец автосервиса",
  "Менеджер филиала",
  "Мойщик",
];

const DateRangeFilter = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <div style={{ padding: 8 }}>
    <RangePicker
      value={
        selectedKeys[0]
          ? [moment(selectedKeys[0][0]), moment(selectedKeys[0][1])]
          : []
      }
      onChange={(dates) => setSelectedKeys(dates ? [dates] : [])}
      style={{ margin: "10px 15px", display: "flex" }}
    />
    <Space
      style={{
        padding: "5px 15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={clearFilters} size="small" style={{ border: "none" }}>
        Сбросить
      </Button>
      <Button
        type="primary"
        onClick={() => confirm()}
        size="small"
        style={{
          width: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        OK
      </Button>
    </Space>
  </div>
);

const EmployeesList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found!");
      return;
    }
    try {
      const [employeesResponse, ordersResponse] = await Promise.all([
        axios.get("http://localhost:8084/v1/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:8081/v1/calendar/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const employees = employeesResponse.data;
      const orders = ordersResponse.data;

      const employeesWithShiftCount = employees.map((employee) => {
        const shiftCount = orders.filter(
          (order) => order.employee === employee.id
        ).length;
        return { ...employee, shiftCount };
      });

      setData(employeesWithShiftCount);
      setFilteredData(employeesWithShiftCount);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase()) ||
        item.employee_type.toLowerCase().includes(value.toLowerCase()) ||
        item.phone_number.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleTypeChange = (list) => {
    setCheckedList(list);
    filterData(list);
  };

  const onCheckAllChange = (e) => {
    const allChecked = e.target.checked ? plainOptions : [];
    setCheckedList(allChecked);
    filterData(allChecked);
  };

  const filterData = (types) => {
    const typeMapping = {
      "Владелец автосервиса": "Владелец",
      "Менеджер филиала": "Менеджер",
      Мойщик: "Мойщик",
    };
    const mappedTypes = types.map((type) => typeMapping[type]);
    if (mappedTypes.length === 0) {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        mappedTypes.includes(item.employee_type)
      );
      setFilteredData(filtered);
    }
  };

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChatClick = () => {};

  const handleUpdateEmployee = async (updatedEmployee) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `http://localhost:8084/v1/employees/${updatedEmployee.id}`,
        updatedEmployee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData(); // Refresh the data after update
      message.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update employee.");
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        "http://localhost:8084/v1/employees",
        newEmployee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData(); // Refresh the data after adding
      message.success("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      message.error("Failed to add employee.");
    }
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Тип сотрудника",
      dataIndex: "employee_type",
      key: "employee_type",
    },
    {
      title: "Телефон",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Начало работы",
      dataIndex: "start_date",
      key: "start_date",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <DateRangeFilter
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      ),
      onFilter: (value, record) => {
        if (!value || value.length === 0) return true;
        const recordDate = moment(record.start_date, "YYYY-MM-DD");
        return recordDate.isBetween(value[0], value[1], "days", "[]");
      },
    },
    {
      title: " ",
      key: "edit",
      render: (text, record) => (
        <a
          href="#"
          onClick={() => {
            setSelectedEmployee(record);
            setIsModalVisible(true);
          }}
        >
          Ред.
        </a>
      ),
    },
  ];

  return (
    <div>
      <div className="employees_head">
        <SearchPanel onSearch={handleSearch} onReloadClick={fetchData} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            className="employee-choice"
            style={{ display: "flex", gap: "16px" }}
          >
            <span className="search-span">Сотрудники:</span>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Все
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 20 }}
      />
      <FloatingButtonsEmployee
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onChatClick={onChatClick}
        handleOk={() => setIsAddModalVisible(true)} // Show the add employee modal
      />
      {isModalVisible && (
        <EmployeeDetailsForm
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          selectedEmployee={selectedEmployee}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}
      {isAddModalVisible && (
        <EmployeeForm
          isModalVisible={isAddModalVisible}
          setIsModalVisible={setIsAddModalVisible}
          handleOk={handleAddEmployee} // Call handleAddEmployee to refresh data
          fetchData={fetchData} // Pass fetchData to EmployeeForm
        />
      )}
    </div>
  );
};

export default EmployeesList;
