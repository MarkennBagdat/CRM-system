import React, { useState, useEffect } from "react";
import { Layout, Tabs, Table, FloatButton, Modal, message } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import FloatingButtonsClients from "../samePages/Buttons/FloatingButtonsClients";
import axios from "axios";
import "../../assets/styles/main.scss";
import "../../assets/styles/App.css";
import SearchPanel from "./component/SearchPanel";
import ClientsForm from "./component/ClientsForm";

const { TabPane } = Tabs;
const { Content } = Layout;
const { confirm } = Modal;

const getTabStyle = (isSelected) => ({
  color: isSelected ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Clients = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found!");
      return;
    }

    axios.get("http://localhost:8082/v1/clients", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.data || response.data.length === 0) {
        console.warn("API returned no data. Please check the server.");
      }
      setData(response.data);
      setFilteredData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the client data!", error);
      if (error.response) {
        console.error("Response data: ", error.response.data);
        console.error("Response status: ", error.response.status);
        console.error("Response headers: ", error.response.headers);
      } else if (error.request) {
        console.error("Request made but no response received", error.request);
      } else {
        console.error("Error setting up request", error.message);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChatClick = () => {};

  const handleSearch = (value) => {
    if (!value) {
      setFilteredData(data);
    } else {
      const lowerCaseValue = value.toLowerCase();
      const filtered = data.filter(item =>
        (item.Name && item.Name.toLowerCase().includes(lowerCaseValue)) ||
        (item.PhoneNumber && item.PhoneNumber.toLowerCase().includes(lowerCaseValue)) ||
        (item.CarBrand && item.CarBrand.toLowerCase().includes(lowerCaseValue)) ||
        (item.CarModel && item.CarModel.toLowerCase().includes(lowerCaseValue)) ||
        (item.CarNumber && item.CarNumber.toLowerCase().includes(lowerCaseValue)) ||
        (item.CarBodyType && item.CarBodyType.toLowerCase().includes(lowerCaseValue))
      );
      setFilteredData(filtered);
    }
    setSearchText(value);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Хотите удалить?',
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("accessToken");
    const promises = selectedRowKeys.map(id => axios.delete(`http://localhost:8082/v1/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));

    Promise.all(promises)
      .then(() => {
        message.success('Selected clients deleted successfully');
        setData(prevData => prevData.filter(client => !selectedRowKeys.includes(client.Id)));
        setFilteredData(prevData => prevData.filter(client => !selectedRowKeys.includes(client.Id)));
        setSelectedRowKeys([]);
      })
      .catch(error => {
        console.error('Error deleting clients:', error);
        message.error('Error deleting clients');
      });
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: "Телефон",
      dataIndex: "PhoneNumber",
      sorter: (a, b) => a.PhoneNumber.localeCompare(b.PhoneNumber),
    },
    {
      title: "Марка",
      dataIndex: "CarBrand",
      sorter: (a, b) => a.CarBrand.localeCompare(b.CarBrand),
    },
    {
      title: "Модель",
      dataIndex: "CarModel",
      sorter: (a, b) => a.CarModel.localeCompare(b.CarModel),
    },
    {
      title: "Номер",
      dataIndex: "CarNumber",
    },
    {
      title: "Тип кузова",
      dataIndex: "CarBodyType",
      sorter: (a, b) => a.CarBodyType.localeCompare(b.CarBodyType),
    },
    {
      title: "Записи",
      dataIndex: "OrderCount",
      sorter: (a, b) => a.OrderCount - b.OrderCount,
    },
  ];

  const handleOk = () => {
    fetchData();
    setIsModalVisible(false);
  };

  return (
    <Layout className="layout">
      <Content>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <Tabs activeKey={selectedKey} onChange={setSelectedKey}>
            <TabPane
              tab={<span style={getTabStyle(selectedKey === "1")}>Общий обзор</span>}
              key="1"
            >
              <SearchPanel onSearch={handleSearch} onSettingsClick={showDeleteConfirm} onReloadClick={fetchData} />
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredData}
                className="clients-table"
                rowKey="Id"
              />
              <FloatButton
                icon={<WechatOutlined />}
                type="default"
                className="samebutton"
                style={{ right: 20 }}
                onClick={onChatClick}
              />
            </TabPane>
          </Tabs>
        </div>
      </Content>
      <FloatingButtonsClients
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onChatClick={onChatClick}
      />
      <ClientsForm
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOk={handleOk}
      />
    </Layout>
  );
};

export default Clients;
