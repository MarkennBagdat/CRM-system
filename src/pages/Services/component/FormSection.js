import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Checkbox,
  message,
  Radio,
} from "antd";
import axios from "axios";
import "../../../assets/styles/App.css";
import "../../../assets/styles/main.scss";

const { Option } = Select;

const cleaningServices = [
  "Химчистка багажника",
  "Химчистка двери",
  "Химчистка сидений",
  "Химчистка пола",
  "Химчистка потолка",
  "Химчистка торпеды и пластика",
  "Химчистка обивок",
  "Устранение неприятных запахов в салоне",
  "Обработка кожаных сидений кондиционером",
];

const washingServices = [
  "Комплексная мойка",
  "Комплексная предпродажная подготовка",
  "Экспресс мойка",
  "Мойка наружная",
  "Мойка двигателя",
  "Мойка поликов",
  "Мойка колесных арок",
  "Уборка багажника",
  "Уборка салона",
  "Полировка салона",
  "Полировка кузова",
  "Чернение автошин",
  "Удаление битумных пятен",
  "Обработка стекла средством антидождь",
  "Промывка инжектора",
  "Пробивка днища",
  "Пробивка кузова",
];

const FormSection = ({ isModalVisible, setIsModalVisible, onAddService }) => {
  const [form] = Form.useForm();
  const [selectedServiceType, setSelectedServiceType] = useState(null);

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("accessToken");

      // Convert detailed services array to string
      // const detailedServicesString = values.detailedServices.join(', ');

      // Convert prices to numbers
      const formattedValues = {
        ...values,
        detailedServices: values.detailedServices,
        LightCarPrice: parseFloat(values.LightCarPrice),
        CrossoverCarPrice: parseFloat(values.CrossoverCarPrice),
        SUVCarPrice: parseFloat(values.SUVCarPrice),
        MiniBusPrice: parseFloat(values.MiniBusPrice),
      };

      const response = await axios.post(
        "http://localhost:8083/v1/services",
        formattedValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
if (onAddService && typeof onAddService === 'function') {
        onAddService(response.data); // Add the new service to the parent state
      } else {
        console.error("onAddService is not a function");
      }

      form.resetFields();
      setIsModalVisible(false);
      message.success("Услуга успешно добавлена");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      message.error("Ошибка при добавлении услуги");
    }
  };

  const renderServiceDetails = () => {
    const serviceList =
      selectedServiceType === "Химчистка" ? cleaningServices : washingServices;

    return (
      <Form.Item
        name="Name"
        label="Детали услуг"
        rules={[{ required: true, message: "Выберите детали услуги" }]}
        style={{ marginBottom: "24px" }}
        labelCol={{
          style: {
            width: "100px",
            display: "flex",
            alignItems: "start",
            border: "none",
          },
        }}
      >
        <Radio.Group style={{ border: "none" }}>
          <Row>
            {serviceList.map((service) => (
              <Col span={12} key={service}>
                <Radio value={service}>{service}</Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Form.Item>
    );
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <div key="footer" className="modal-footer-buttons">
          <Button
            key="submit"
            type="primary"
            className="save-button"
            onClick={onSave}
          >
            Сохранить
          </Button>
          <Button
            key="back"
            className="close-button"
            onClick={() => setIsModalVisible(false)}
          >
            Закрыть
          </Button>
        </div>,
      ]}
      width={700}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={{ layout: "horizontal" }}
      >
        <div
          className="modal-title"
          style={{ paddingBottom: "16px", borderBottom: "1px solid #e8e8e8" }}
        >
          Добавить услугу
        </div>

        <Form.Item
          label="Вид услуги"
          name="Type"
          rules={[{ required: true, message: "Выберите вид услуги" }]}
          style={{ margin: "24px 0" }}
          labelCol={{
            style: { width: "100px", display: "flex", alignItems: "start" },
          }}
        >
          <Select
            className="custom-select"
            placeholder="Выберите вид услуги"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedServiceType(value)}
          >
            <Option value="Химчистка">Химчистка</Option>
            <Option value="Мойка">Мойка</Option>
          </Select>
        </Form.Item>
        {selectedServiceType && renderServiceDetails()}
        <Form.Item
          name="Description"
          label="Описание"
          rules={[{ required: true, message: "Введите описание услуги" }]}
          style={{ marginBottom: "24px" }}
          labelCol={{
            style: { width: "100px", display: "flex", alignItems: "start" },
          }}
        >
          <Input.TextArea
            placeholder="Описание услуги"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <div
          className="modal-title"
          style={{ paddingBottom: "5px", borderBottom: "1px solid #e8e8e8" }}
        >
          Прайс
        </div>
        <Row gutter={16} style={{ paddingTop: "24px" }}>
          <Col span={12}>
            <Form.Item
              name="LightCarPrice"
              label="Легковая"
              rules={[
                {
                  required: true,
                  message: "Введите цену для легковой машины",
                },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для легковой машины" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="CrossoverCarPrice"
              label="Кроссовер"
              rules={[
                { required: true, message: "Введите цену для кроссовера" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для кроссовера" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="SUVCarPrice"
              label="Внедорожник"
              rules={[
                { required: true, message: "Введите цену для внедорожника" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для внедорожника" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="MiniBusPrice"
              label="Микроавтобус"
              rules={[
                { required: true, message: "Введите цену для микроавтобуса" },
              ]}
              labelCol={{
                style: {
                  width: "105px",
                  display: "flex",
                  alignItems: "start",
                },
              }}
            >
              <Input placeholder="Цена для микроавтобуса" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormSection;
