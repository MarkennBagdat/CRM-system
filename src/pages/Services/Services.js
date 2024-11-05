import React, { useState, useEffect } from "react";
import { Layout, Table, Slider, Button, Row, Tabs, Modal, message } from "antd";
import axios from "axios";
import SearchPanel from "./component/SearchPanel";
import FormSection from "./component/FormSection";
import "../../assets/styles/App.css";
import FloatingButtons from "../samePages/Buttons/FloatingButtonsServices";

const { Content } = Layout;
const { TabPane } = Tabs;
const { confirm } = Modal;

const getMenuItemStyle = (isSelected) => ({
  borderBottom: isSelected ? "2px solid rgba(255, 255, 255, 1)" : "none",
  color: isSelected ? "rgba(3, 149, 255, 1)" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const getPriceFilterDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <div style={{ padding: 8 }}>
    <p
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      от 0 до 80000
    </p>
    <Slider
      range
      value={selectedKeys[0] || [0, 80000]}
      onChange={(value) => setSelectedKeys([value])}
      min={0}
      max={80000}
      style={{ margin: 8, width: "90%" }}
    />
    <Row justify="end">
      <Button
        type="primary"
        size="small"
        style={{ width: 90, marginRight: 10 }}
        onClick={() => confirm()}
      >
        OK
      </Button>
      <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
        Reset
      </Button>
    </Row>
  </div>
);

const columns = [
  {
    title: "Вид услуг",
    dataIndex: "Type",
    key: "Type",
    width: 150,
    sorter: (a, b) => a.Type.localeCompare(b.Type),
    filters: [
      { text: "Химчистка", value: "Химчистка" },
      { text: "Мойка", value: "Мойка" },
    ],
    onFilter: (value, record) => record.Type.includes(value),
  },
  {
    title: "Название",
    dataIndex: "Name",
    key: "Name",
    width: 200,
    sorter: (a, b) => a.Name.localeCompare(b.Name),
  },
  {
    title: "Описание",
    dataIndex: "Description",
    key: "Description",
    width: 250,
    sorter: (a, b) => a.Description.localeCompare(b.Description),
  },
  {
    title: "Прайс",
    children: [
      {
        title: "Легковая",
        dataIndex: "LightCarPrice",
        key: "LightCarPrice",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.LightCarPrice >= value[0] && record.LightCarPrice <= value[1],
      },
      {
        title: "Кроссовер",
        dataIndex: "CrossoverCarPrice",
        key: "CrossoverCarPrice",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.CrossoverCarPrice >= value[0] && record.CrossoverCarPrice <= value[1],
      },
      {
        title: "Внедорожник",
        dataIndex: "SUVCarPrice",
        key: "SUVCarPrice",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.SUVCarPrice >= value[0] && record.SUVCarPrice <= value[1],
      },
      {
        title: "Микроавтобус",
        dataIndex: "MiniBusPrice",
        key: "MiniBusPrice",
        width: 150,
        filterDropdown: getPriceFilterDropdown,
        onFilter: (value, record) =>
          record.MiniBusPrice >= value[0] && record.MiniBusPrice <= value[1],
      },
    ],
  },
];

const Services = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8083/v1/services", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setServices(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddService = async (newService) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "http://localhost:8083/v1/services",
        newService,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setServices((prevServices) => [...prevServices, response.data]);
      message.success("Услуга успешно добавлена");
    } catch (error) {
      console.error("Error adding service:", error);
      message.error("Ошибка при добавлении услуги");
    }
  };

  const handleUpdateService = async (serviceID, updatedService) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `http://localhost:8083/v1/services/${serviceID}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceID ? { ...service, ...updatedService } : service
        )
      );
      message.success("Услуга успешно обновлена");
    } catch (error) {
      console.error("Error updating service:", error);
      message.error("Ошибка при обновлении услуги");
    }
  };

  const handleDeleteService = async (serviceID) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://localhost:8083/v1/services/${serviceID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceID)
      );
      message.success("Услуга успешно удалена");
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error("Ошибка при удалении услуги");
    }
  };

  const handleSearch = (value) => {
    const filtered = services.filter(
      (item) =>
        (item.Name &&
          item.Name.toLowerCase().includes(value.toLowerCase())) ||
        (item.Description &&
          item.Description.toLowerCase().includes(value.toLowerCase())) ||
        (item.Type &&
          item.Type.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const showDeleteConfirm = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Пожалуйста, выберите услугу');
      return;
    }
  
    confirm({
      title: 'Хотите удалить услугу?',
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
        message.success('Выбранные услуги успешно удалены');
        setData(prevData => prevData.filter(client => !selectedRowKeys.includes(client.Id)));
        setFilteredData(prevData => prevData.filter(client => !selectedRowKeys.includes(client.Id)));
        setSelectedRowKeys([]);
      })
      .catch(error => {
        console.error('Ошибка при удалении услуг:', error);
        message.error('Ошибка при удалении услуг');
      });
  };
  const onSelectChange = (selectedKeys) => {
    console.log("Selected row keys changed: ", selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Layout>
      <Layout className="site-layout">
        <Content>
          <Tabs activeKey={selectedKey} onChange={setSelectedKey}>
            <TabPane
              tab={
                <span style={getMenuItemStyle(selectedKey === "1")}>
                  Обратная связь
                </span>
              }
              key="1"
            >
              <div>
                <SearchPanel onSearch={handleSearch} onSettingsClick={showDeleteConfirm} onReloadClick={fetchData}/>
                <Table
                  rowSelection={rowSelection}
                  dataSource={searchText ? filteredData : services}
                  columns={columns}
                  bordered
                  pagination={{ pageSize: 50 }}
                  style={{ paddingTop: "20px", borderRadius: "0px" }}
                />
                <FloatingButtons onClickAdd={() => setIsModalVisible(true)} />
              </div>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
      <FormSection
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onAddService={handleAddService}
      />
    </Layout>
  );
};

export default Services;
