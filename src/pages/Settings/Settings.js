import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Divider,
  InputNumber,
  TimePicker,
  Tabs,
  Modal,
} from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext"; // Импортируйте AuthContext

const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = TimePicker;
const { TabPane } = Tabs;

const getMenuItemStyle = (isSelected) => ({
  borderBottom: isSelected ? "2px solid rgba(255, 255, 255, 1)" : "none",
  color: isSelected ? "rgba(3, 149, 255, 1)" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Используйте AuthContext для выхода из системы
  const [selectedKey, setSelectedKey] = useState("1");
  const [settings, setSettings] = useState({
    serviceName: "",
    ownerEmail: "",
    website: "",
    serviceCategory: "",
    ownerPhone: "",
    inn: "",
    bic: "",
    bankAccount: "",
    branchName: "",
    city: "",
    address: "",
    manager: "",
    workingDays: [],
    workingHours: [moment("09:00", "HH:mm"), moment("18:00", "HH:mm")],
    boxCount: 3,
  });

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));
    if (savedSettings) {
      setSettings({
        ...savedSettings,
        workingHours: [
          moment(savedSettings.workingHours[0]),
          moment(savedSettings.workingHours[1]),
        ],
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleWorkingHoursChange = (time) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      workingHours: time,
    }));
  };

  const handleBoxCountChange = (value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      boxCount: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < settings.boxCount; i++) {
      boxes.push(
        <Col span={4} key={i} className="settings-col">
          <Button className="custom-button">
            <EditOutlined className="custom-button-icon" />
            Бокс {String.fromCharCode(65 + i)}
          </Button>
        </Col>
      );
    }
    return boxes;
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Вы точно хотите выйти?",
      okText: "Выйти",
      cancelText: "Отмена",
      okButtonProps: { style: { width: "80px" } },
      cancelButtonProps: { style: { width: "80px" } },
      onOk() {
        logout(); // Используйте функцию logout из контекста
        navigate("/login"); // Перенаправление на страницу логина
      },
      onCancel() {
        console.log("Отмена выхода");
      },
    });
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
              <div style={{ margin: "0 24px 70px" }}>
                <div className="setting-logout">
                  <div>
                    <h3 className="section-title">Основные настройки</h3>
                    <p className="section-description">
                      Внесите информацию о Вашем автосервисе
                    </p>
                  </div>
                  <Button
                    type="primary"
                    danger
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#EB0536",
                      borderColor: "#EB0536",
                    }}
                  >
                    Выйти
                    <LogoutOutlined
                      style={{ color: "#fff", marginRight: "5px" }}
                    />
                  </Button>
                </div>
                <Divider />
                <Form layout="vertical" className="settings-form">
                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Название автосервиса"
                        name="serviceName"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите название автосервиса",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Название"
                          name="serviceName"
                          value={settings.serviceName}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Почта автосервиса/владельца"
                        name="ownerEmail"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите почту",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Почтовый адрес"
                          name="ownerEmail"
                          value={settings.ownerEmail}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Вебсайт (при наличии)"
                        name="website"
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Адрес сайта"
                          name="website"
                          value={settings.website}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Категория автосервиса"
                        name="serviceCategory"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите категорию",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Select
                          className="custom-select"
                          placeholder="Выберите..."
                          name="serviceCategory"
                          value={settings.serviceCategory}
                          onChange={(value) =>
                            handleSelectChange("serviceCategory", value)
                          }
                        >
                          <Option value="self-service">
                            Автомойка самообслуживания
                          </Option>
                          <Option value="manual">Ручная автомойка</Option>
                          <Option value="automatic">
                            Автоматическая автомойка
                          </Option>
                          <Option value="touchless">
                            Бесконтактная автомойка
                          </Option>
                          <Option value="mobile">Мобильная автомойка</Option>
                          <Option value="eco">Эко-мойка</Option>
                          <Option value="complex">Комплексная мойка</Option>
                          <Option value="premium">Мойка премиум-класса</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Номер телефона владельца"
                        name="ownerPhone"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите номер телефона",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Номер"
                          name="ownerPhone"
                          value={settings.ownerPhone}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <h3 className="section-title">Реквизиты</h3>
                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="ИНН"
                        name="inn"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите ИНН",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="ИНН"
                          name="inn"
                          value={settings.inn}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="БИК"
                        name="bic"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите БИК",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="БИК"
                          name="bic"
                          value={settings.bic}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Банковский счет"
                        name="bankAccount"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите банковский счет",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Счет"
                          name="bankAccount"
                          value={settings.bankAccount}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="settings-divider" />

                  <h3 className="section-title">Настройки филиала</h3>
                  <p className="section-description">
                    Внесите информацию о Вашем филиале
                  </p>
                  <Divider />
                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Название филиала"
                        name="branchName"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите название филиала",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Название"
                          name="branchName"
                          value={settings.branchName}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Город"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите город",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Город"
                          name="city"
                          value={settings.city}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Адрес"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите адрес",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Адрес"
                          name="address"
                          value={settings.address}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Менеджер"
                        name="manager"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите имя менеджера",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Input
                          className="custom-input"
                          placeholder="Имя"
                          name="manager"
                          value={settings.manager}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                
                  </Row>

                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Дни работы"
                        name="workingDays"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, выберите дни работы",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <Select
                          className="custom-select"
                          mode="multiple"
                          placeholder="Выберите..."
                          name="workingDays"
                          value={settings.workingDays}
                          onChange={(value) =>
                            handleSelectChange("workingDays", value)
                          }
                        >
                          <Option value="Понедельник">Понедельник</Option>
                          <Option value="Вторник">Вторник</Option>
                          <Option value="Среда">Среда</Option>
                          <Option value="Четверг">Четверг</Option>
                          <Option value="Пятница">Пятница</Option>
                          <Option value="Суббота">Суббота</Option>
                          <Option value="Воскресенье">Воскресенье</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Часы работы филиала"
                        name="workingHours"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите часы работы филиала",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <RangePicker
                          className="custom-input"
                          format="HH:mm"
                          value={settings.workingHours}
                          onChange={handleWorkingHoursChange}
                          placeholder={["Начало", "Конец"]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider />

                  <h3 className="section-title">Боксы</h3>
                  <Row gutter={16} className="settings-row">
                    <Col span={8} className="settings-col">
                      <Form.Item
                        label="Количество боксов"
                        name="boxCount"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите количество боксов",
                          },
                        ]}
                        className="settings-form-item"
                      >
                        <InputNumber
                          min={1}
                          max={10}
                          value={settings.boxCount}
                          onChange={handleBoxCountChange}
                          className="custom-input"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16} className="boxes-row">
                    {renderBoxes()}
                  </Row>

                  <Divider />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "180px" }}
                      onClick={handleSave}
                    >
                      Сохранить
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;
