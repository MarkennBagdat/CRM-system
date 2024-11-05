import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, message } from "antd";
import axios from "axios";
import moment from "moment";

const InventoryForm = ({ setIsModalVisible }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = {
        ...values,
        ExpirationTime: values.ExpirationTime.toISOString(),
      };
      await axios.post("http://localhost:8085/v1/warehouse", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success("Product added successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleValuesChange = (changedValues, allValues) => {
    const { Count, Amount } = allValues;
    if (Count && Amount) {
      const totalAmount = Count * Amount;
      form.setFieldsValue({ TotalAmount: totalAmount });
    }
  };

  return (
    <Form
      form={form}
      name="add_product"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Тип товара"
            name="Type"
            rules={[
              { required: true, message: "Пожалуйста, введите тип товара!" },
            ]}
          >
            <Input placeholder="Тип товара" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Название"
            name="Name"
            rules={[
              { required: true, message: "Пожалуйста, введите название!" },
            ]}
          >
            <Input placeholder="Название" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Количество"
            name="Count"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите количество товара!",
              },
            ]}
          >
            <InputNumber
              placeholder="Количество товара"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Единица измерения"
            name="MeasurementType"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите единицу измерения!",
              },
            ]}
          >
            <Input placeholder="Ед. измерения" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Цена за единицу, тг"
            name="Amount"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите цену за единицу!",
              },
            ]}
          >
            <InputNumber
              placeholder="Цена за единицу"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Сумма, тг"
            name="TotalAmount"
          >
            <InputNumber style={{ width: "100%" }} readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Поставщик"
            name="Supplier"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название компании!",
              },
            ]}
          >
            <Input placeholder="Название компании" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Срок годности"
            name="ExpirationTime"
            rules={[
              { required: true, message: "Пожалуйста, введите срок годности!" },
            ]}
          >
            <DatePicker placeholder="Дата" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Примечание"
        name="Note"
      >
        <Input placeholder="Комментарий" />
      </Form.Item>

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
  );
};

export default InventoryForm;
