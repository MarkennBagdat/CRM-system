import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Button, Radio } from "antd";
import moment from "moment";

const EmployeeDetailsForm = ({
  isModalVisible,
  setIsModalVisible,
  selectedEmployee,
  onUpdateEmployee,
}) => {
  const [form] = Form.useForm();
  const [position, setPosition] = useState(selectedEmployee.employee_type);

  useEffect(() => {
    form.setFieldsValue({
      ...selectedEmployee,
      start_date: moment(selectedEmployee.start_date),
      employee_type: selectedEmployee.employee_type
    });
    setPosition(selectedEmployee.employee_type);
  }, [selectedEmployee, form]);

  const onFinish = (values) => {
    const updatedEmployee = {
      ...selectedEmployee,
      ...values,
      start_date: values.start_date.format("YYYY-MM-DDTHH:mm:ss[Z]"),
      employee_type: position,
    };
    onUpdateEmployee(updatedEmployee);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  return (
    <Modal
      title="Редактировать сотрудника"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{
          ...selectedEmployee,
          start_date: moment(selectedEmployee.start_date),
        }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="first_name"
          label="Имя"
          rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Фамилия"
          rules={[{ required: true, message: "Пожалуйста, введите фамилию" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employee_type"
          label="Тип сотрудника"
          rules={[{ required: true, message: "Пожалуйста, введите тип сотрудника" }]}
        >
          <Radio.Group value={position} onChange={handlePositionChange}>
            <Radio.Button value="Мойщик">Мойщик</Radio.Button>
            <Radio.Button value="Владелец">Владелец</Radio.Button>
            <Radio.Button value="Менеджер">Менеджер</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Телефон"
          rules={[{ required: true, message: "Пожалуйста, введите номер телефона" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="start_date"
          label="Начало работы"
          rules={[{ required: true, message: "Пожалуйста, выберите дату начала работы" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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

export default EmployeeDetailsForm;
