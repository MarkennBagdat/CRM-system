import React from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from "antd";

const { Option } = Select;

const InventoryDetailsForm = ({
  isModalVisible,
  setIsModalVisible,
  selectedItem,
  onUpdateService,
  fetchInventoryData
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onUpdateService({ ...selectedItem, ...values });
    setIsModalVisible(false);
    form.resetFields();
    fetchInventoryData(); // Refresh the data after updating
  };

  return (
    <Modal
      title="Редактировать товар"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        initialValues={selectedItem}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="Type"
          label="Наименование товара"
          rules={[{ required: true, message: "Пожалуйста, введите наименование товара" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Name"
          label="Название"
          rules={[{ required: true, message: "Пожалуйста, введите название" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Count"
          label="Количество"
          rules={[{ required: true, message: "Пожалуйста, введите количество" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="MeasurementType"
          label="Ед. измерения"
          rules={[{ required: true, message: "Пожалуйста, введите ед. измерения" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Сумма, тг"
          rules={[{ required: true, message: "Пожалуйста, введите сумму" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="Supplier"
          label="Поставщик"
          rules={[{ required: true, message: "Пожалуйста, введите поставщика" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ExpirationTime"
          label="Срок годности"
          rules={[{ required: true, message: "Пожалуйста, введите срок годности" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="Note" label="Примечание">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryDetailsForm;
