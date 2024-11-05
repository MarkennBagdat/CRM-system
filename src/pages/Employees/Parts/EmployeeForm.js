import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, Row, Col, Radio, InputNumber, message } from "antd";
import moment from "moment";
import axios from "axios";

moment.locale("kk");

const EmployeeForm = ({ isModalVisible, setIsModalVisible, handleOk, fetchData  }) => {
  const [position, setPosition] = useState("Мойщик");
  const [form] = Form.useForm();

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const onFinish = async (values) => {
    const formattedValues = {
      first_name: values.firstName,
      last_name: values.lastName,
      employee_type: position,
      phone_number: values.phone,
      start_date: values.startDate.toISOString(),
      shiftCount: values.shiftCount
    };

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post("http://localhost:8084/v1/employees", formattedValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalVisible(false);
      message.success("Успешно сохранился! Обновите страницу");
      form.resetFields();
      handleOk(); // Call the parent handleOk method to refresh the list
      fetchData(); // Call fetchData to refresh the employee list
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "start", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>
          Добавить сотрудника
        </div>
      }
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      onOk={form.submit}
      okText="Сохранить"
      cancelText="Закрыть"
      width={800}
      style={{ borderRadius: "2px", transform: "none" }}
      footer={null}
    >
      <Form layout="vertical" style={{ paddingTop: "16px" }} onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Должность:"
              name="position"
              rules={[{ required: true, message: "Пожалуйста, выберите должность" }]}
            >
              <Radio.Group value={position} onChange={handlePositionChange}>
                <Radio.Button value="Мойщик">Мойщик</Radio.Button>
                <Radio.Button value="Владелец">Владелец</Radio.Button>
                <Radio.Button value="Менеджер">Менеджер</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Количество смен:"
              name="shiftCount"
              rules={[{ required: true, message: "Пожалуйста, введите количество смен" }]}
            >
              <InputNumber min={1} placeholder="Количество смен" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Имя:"
              name="firstName"
              rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
            >
              <Input placeholder="Имя" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Фамилия:"
              name="lastName"
              rules={[{ required: true, message: "Пожалуйста, введите фамилию" }]}
            >
              <Input placeholder="Фамилия" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Телефон:"
              name="phone"
              rules={[{ required: true, message: "Пожалуйста, введите номер телефона" }]}
            >
              <Input placeholder="Номер" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Начало работы:"
              name="startDate"
              rules={[{ required: true, message: "Пожалуйста, выберите дату начала" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Дата начала" />
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
                style={{ border: "1px solid rgba(103, 101, 101, 1)", backgroundColor: "white" }}
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

export default EmployeeForm;
