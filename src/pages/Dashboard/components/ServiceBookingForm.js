import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Select,
  InputNumber,
  message,
} from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

moment.locale("kk");

const ServiceBookingForm = ({
  isModalVisible,
  setIsModalVisible,
  handleAddRecord,
}) => {
  const [discount, setDiscount] = useState(0);
  const [form] = Form.useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [boxCount, setBoxCount] = useState(7);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [newCarNumber, setNewCarNumber] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found!");
          return;
        }
        const [servicesResponse, employeesResponse, clientsResponse] =
          await Promise.all([
            axios.get("http://localhost:8083/v1/services", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:8084/v1/employees", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:8082/v1/clients", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        setServices(servicesResponse.data || []);
        setEmployees(employeesResponse.data || []);
        setClients(clientsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  const handleDiscountChange = (value) => {
    setDiscount(value);
    setSelectedDiscount(value);
    calculateTotalAmount();
  };

  const handleServiceChange = (value) => {
    form.setFieldsValue({ services: value });
    calculateTotalAmount();
  };

  const handleBodyTypeChange = (value) => {
    setSelectedBodyType(value);
    form.setFieldsValue({ CarBodyType: value });
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    const selectedService = form.getFieldValue("services");
    const CarBodyType = selectedBodyType;

    if (!selectedService || !CarBodyType) {
      return;
    }

    const service = services.find((service) => service.Id === selectedService);

    if (!service) {
      return;
    }

    const priceMap = {
      Легковая: service.LightCarPrice,
      Кроссовер: service.CrossoverCarPrice,
      Внедорожник: service.SUVCarPrice,
      Микроавтобус: service.MiniBusPrice,
    };

    const originalAmount = priceMap[CarBodyType] || 0;
    const discountAmount = discount ? (originalAmount * discount) / 100 : 0;
    const newTotal = Math.round(originalAmount - discountAmount);

    setTotalAmount(newTotal);
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < boxCount; i++) {
      const boxLabel = `Бокс ${String.fromCharCode(65 + i)}`;
      boxes.push(
        <Button
          key={i}
          className={`custom-input ${
            selectedBox === boxLabel ? "active" : "inactive"
          }`}
          onClick={() => {
            setSelectedBox(boxLabel);
            form.setFieldsValue({ Box: boxLabel });
          }}
        >
          {boxLabel}
        </Button>
      );
    }
    return boxes;
  };

  const renderBodyTypes = () => {
    const CarBodyTypes = [
      "Легковая",
      "Кроссовер",
      "Внедорожник",
      "Микроавтобус",
    ];
    return CarBodyTypes.map((type, index) => (
      <Button
        key={index}
        className={`custom-input ${
          selectedBodyType === type ? "active" : "inactive"
        }`}
        onClick={() => handleBodyTypeChange(type)}
      >
        {type}
      </Button>
    ));
  };

  const renderDiscountButtons = () => {
    const discountValues = [0, 5, 10, 15];
    return discountValues.map((value, index) => (
      <Button
        key={index}
        className={`custom-input ${
          selectedDiscount === value ? "active" : "inactive"
        }`}
        onClick={() => handleDiscountChange(value)}
      >
        {value}%
      </Button>
    ));
  };

  const calculateStatus = (startDate, endDate) => {
    const now = moment();
    if (endDate.isBefore(now, "day")) {
      return "Completed";
    } else if (startDate.isAfter(now, "day")) {
      return "Planned";
    } else {
      return "Started";
    }
  };

  const handleCarNumberChange = (value) => {
    if (value === "createNew") {
      setIsCreatingNew(true);
      form.setFieldsValue({ CarNumber: "" });
    } else {
      setIsCreatingNew(false);
      const client = clients.find((client) => client.CarNumber === value);
      if (client) {
        form.setFieldsValue({
          Name: client.Name,
          PhoneNumber: client.PhoneNumber,
          CarBrand: client.CarBrand,
          CarModel: client.CarModel,
          CarBodyType: client.CarBodyType,
          OrderCount: client.OrderCount.toString(),
        });
        setSelectedBodyType(client.CarBodyType);
        calculateTotalAmount();
      } else {
        form.resetFields([
          "Name",
          "PhoneNumber",
          "CarBrand",
          "CarModel",
          "CarBodyType",
        ]);
        setSelectedBodyType(null);
      }
    }
  };

  const getUniqueClients = (clients) => {
    const uniqueCarNumbers = new Set();
    return clients.filter((client) => {
      if (uniqueCarNumbers.has(client.CarNumber)) {
        return false;
      } else {
        uniqueCarNumbers.add(client.CarNumber);
        return true;
      }
    });
  };

  const incrementClientOrderCount = async (client) => {
    try {
      const token = localStorage.getItem("accessToken");
      const updatedClient = {
        ...client,
        OrderCount: (parseInt(client.OrderCount) + 1).toString(),
      };
      await axios.put(
        `http://localhost:8082/v1/clients/${client.Id}`,
        updatedClient,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClients((prevClients) =>
        prevClients.map((c) => (c.Id === client.Id ? updatedClient : c))
      );
    } catch (error) {
      console.error("Error updating client order count:", error);
      message.error("Failed to update client order count.");
    }
  };

  const onFinish = async (values) => {
    const startDate = values.date[0];
    const endDate = values.date[1];
    const now = moment();
    
    if (endDate.isBefore(now, "day")) {
      message.error("Нельзя добавить запись задним числом.");
      return;
    }

    const status = calculateStatus(startDate, endDate);

    const employee = employees.find((emp) => emp.id === values.employee);
    const carBrand = values.CarBrand;

    const formattedValues = {
      Name: values.Name,
      Brand: carBrand,
      CarNumber: isCreatingNew ? newCarNumber : values.CarNumber,
      PhoneNumber: values.PhoneNumber,
      CarModel: values.CarModel,
      degree: values.degree,
      Box: selectedBox,
      CarBodyType: selectedBodyType,
      services: values.services,
      EmployeeId: values.employee,
      CreatedAt: values.date.map((date) => date.toISOString()),
      time: values.time.map((time) => time.toISOString()),
      discount: selectedDiscount,
      payment: selectedPayment,
      Cost: parseFloat(totalAmount),
      Type: status,
      OrderCount: values.OrderCount,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8081/v1/calendar/orders",
        formattedValues,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleAddRecord(response.data);

      const existingClient = clients.find(
        (client) => client.CarNumber === values.CarNumber
      );
      if (existingClient) {
        await incrementClientOrderCount(existingClient);
      } else {
        const clientValues = {
          Name: values.Name,
          PhoneNumber: values.PhoneNumber,
          CarBrand: values.CarBrand,
          CarModel: values.CarModel,
          CarNumber: isCreatingNew ? newCarNumber : values.CarNumber,
          CarBodyType: selectedBodyType,
          OrderCount: "1",
        };
        const newClientResponse = await axios.post(
          "http://localhost:8082/v1/clients",
          clientValues,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClients((prevClients) => [...prevClients, newClientResponse.data]);
      }

      setIsModalVisible(false);
      form.resetFields();
      setIsCreatingNew(false);
      setNewCarNumber("");
      message.success("Запись успешно добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении записи:", error);
      message.error("Ошибка при добавлении записи.");
    }
  };

  const uniqueClients = getUniqueClients(clients);

  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "start",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        >
          Детали записи
        </div>
      }
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={handleAddRecord}
      okText="Сохранить"
      cancelText="Закрыть"
      width={995}
      style={{
        borderRadius: "8px",
        transform: "none",
      }}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Имя клиента:"
              name="Name"
              rules={[{ required: true, message: "Введите имя клиента" }]}
            >
              <Input placeholder="Имя клиента" className="custom-input" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Марка:"
              name="CarBrand"
              rules={[{ required: true, message: "Введите марку машины" }]}
            >
              <Input placeholder="Марка машины" className="custom-input" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Номер:"
              name="CarNumber"
              rules={[{ required: true, message: "Введите номер машины" }]}
            >
              {isCreatingNew ? (
                <Input
                  placeholder="Введите номер машины"
                  value={newCarNumber}
                  onChange={(e) => setNewCarNumber(e.target.value)}
                  className="custom-input"
                />
              ) : (
                <Select
                  showSearch
                  placeholder="Выберите номер машины"
                  className="custom-select"
                  dropdownClassName="custom-select-dropdown"
                  onChange={handleCarNumberChange}
                >
                  {uniqueClients.map((client) => (
                    <Option key={client.Id} value={client.CarNumber}>
                      {client.CarNumber}
                    </Option>
                  ))}
                  <Option value="createNew">Создать новый</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Телефон:"
              name="PhoneNumber"
              rules={[{ required: true, message: "Введите номер телефона" }]}
            >
              <Input placeholder="Номер телефона" className="custom-input" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Модель:"
              name="CarModel"
              rules={[{ required: true, message: "Введите модель машины" }]}
            >
              <Input placeholder="Модель машины" className="custom-input" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Степень загрязнения:"
              name="degree"
              rules={[
                { required: true, message: "Введите степень загрязнения" },
              ]}
            >
              <Select
                placeholder="Степень загрязнения"
                className="custom-select"
                dropdownClassName="custom-select-dropdown"
              >
                <Option value="low">Низкая</Option>
                <Option value="medium">Средняя</Option>
                <Option value="high">Высокая</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Бокс"
              name="Box"
              rules={[{ required: true, message: "Выберите бокс" }]}
            >
              <div className="box-buttons">{renderBoxes()}</div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Тип кузова"
              name="CarBodyType"
              rules={[{ required: true, message: "Выберите тип кузова" }]}
            >
              <div className="body-type-buttons">{renderBodyTypes()}</div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Услуги:"
              name="services"
              rules={[{ required: true, message: "Выберите услуги" }]}
            >
              <Select
                placeholder="Выберите услуги"
                className="custom-select"
                dropdownClassName="custom-select-dropdown"
                onChange={handleServiceChange}
              >
                {services.map((service) => (
                  <Option key={service.Id} value={service.Id}>
                    {service.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Сотрудник:"
              name="employee"
              rules={[{ required: true, message: "Выберите сотрудника" }]}
            >
              <Select
                placeholder="Выберите сотрудника"
                className="custom-select"
                dropdownClassName="custom-select-dropdown"
              >
                {employees.map((employee) => (
                  <Option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Дата:"
              name="date"
              rules={[{ required: true, message: "Выберите дату" }]}
            >
              <RangePicker
                style={{ width: "100%" }}
                placeholder={["Дата начала", "Дата окончания"]}
                className="custom-input"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Время:"
              name="time"
              rules={[{ required: true, message: "Выберите время" }]}
            >
              <RangePicker
                picker="time"
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder={["Время начала", "Время окончания"]}
                className="custom-input"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Оплата"
              name="payment"
              rules={[{ required: true, message: "Выберите способ оплаты" }]}
            >
              <div className="payment-method-buttons">
                <Button
                  className={`custom-input ${
                    selectedPayment === "Наличные" ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setSelectedPayment("Наличные");
                    form.setFieldsValue({ payment: "Наличные" });
                  }}
                >
                  Наличные
                </Button>
                <Button
                  className={`custom-input ${
                    selectedPayment === "Банковская карта"
                      ? "active"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setSelectedPayment("Банковская карта");
                    form.setFieldsValue({ payment: "Банковская карта" });
                  }}
                >
                  Банковская карта
                </Button>
                <Button
                  className={`custom-input ${
                    selectedPayment === "Счет Kaspi" ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setSelectedPayment("Счет Kaspi");
                    form.setFieldsValue({ payment: "Счет Kaspi" });
                  }}
                >
                  Счет Kaspi
                </Button>
                <Button
                  className={`custom-input ${
                    selectedPayment === "Kaspi QR" ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setSelectedPayment("Kaspi QR");
                    form.setFieldsValue({ payment: "Kaspi QR" });
                  }}
                >
                  Kaspi QR
                </Button>
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Скидка" name="discount">
              <div className="discount-buttons">
                {renderDiscountButtons()}
                <InputNumber
                  min={0}
                  max={100}
                  className="custom-input"
                  placeholder="%"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12} className="total-amount">
            Итог к оплате: {totalAmount} тг
          </Col>
        </Row>
        <Form.Item>
          <Row justify="center">
            <Col>
              <Button type="primary" htmlType="submit" className="save-button">
                Сохранить
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setIsModalVisible(false)}
                className="close-button"
              >
                Закрыть
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceBookingForm;
