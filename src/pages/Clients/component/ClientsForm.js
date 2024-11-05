import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  InputNumber,
  Select,
} from "antd";
import axios from "axios";

const { Option } = Select;

const ClientsForm = ({ isModalVisible, setIsModalVisible, handleOk }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.get("http://localhost:8082/v1/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const clients = response.data;
      const existingClient = clients.find(
        (client) => client.CarNumber === values.CarNumber
      );

      if (existingClient) {
        const updatedClient = {
          ...existingClient,
          OrderCount: (parseInt(existingClient.OrderCount) + 1).toString(),
        };

        await axios.put(
          `http://localhost:8082/v1/clients/${existingClient.Id}`,
          updatedClient,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        message.success("Счетчик заказов обновлен");
      } else {
        const newClient = {
          ...values,
          OrderCount: "1",
        };
        await axios.post("http://localhost:8082/v1/clients", newClient, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Новый клиент создан");
      }

      form.resetFields();
      setIsModalVisible(false); // Закрываем форму здесь
      handleOk(); // Обновляем данные в таблице после закрытия формы
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <Modal
      title="Добавить клиента"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={form.submit}
      okText="Сохранить"
      cancelText="Закрыть"
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ paddingTop: "16px" }}
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Имя:"
              name="Name"
              rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
            >
              <Input placeholder="Имя" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Телефон:"
              name="PhoneNumber"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона",
                },
              ]}
            >
              <Input placeholder="Телефон" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Марка автомобиля:"
              name="CarBrand"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите марку автомобиля",
                },
              ]}
            >
              <Input placeholder="Марка автомобиля" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Модель автомобиля:"
              name="CarModel"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите модель автомобиля",
                },
              ]}
            >
              <Input placeholder="Модель автомобиля" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Номер автомобиля:"
              name="CarNumber"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер автомобиля",
                },
              ]}
            >
              <Input placeholder="Номер автомобиля" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Записи:"
              name="OrderCount"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите количество записей",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Тип кузова:"
              name="CarBodyType"
              rules={[
                { required: true, message: "Пожалуйста, выберите тип кузова" },
              ]}
            >
              <Select placeholder="Выберите тип кузова">
                <Option value="Легковая">Легковая</Option>
                <Option value="Кроссовер">Кроссовер</Option>
                <Option value="Внедорожник">Внедорожник</Option>
                <Option value="Микроавтобус">Микроавтобус</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={10} justify="center">
            <Col>
              <Button type="primary" htmlType="submit" className="save-button">
                Сохранить
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setIsModalVisible(false)}
                className="close-button"
                style={{
                  border: "1px solid rgba(103, 101, 101, 1)",
                  backgroundColor: "white",
                }}
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

export default ClientsForm;
