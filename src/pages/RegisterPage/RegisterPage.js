import React from "react";
import { Layout, Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyDriveLogo from "../../assets/images/myDrivePrologo.svg";
import styles from "../../assets/styles/Register.module.css";

const { Content } = Layout;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'top',
      duration: 5,
    });
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/register",
        {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Успешная регистрация! Вы успешно зарегистрировались!");
      navigate("/login");
    } catch (error) {
      openNotification(
        "error",
        "Ошибка регистрации",
        `Регистрация не удалась: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error("Registration failed:", error.message);
    }
  };
  

  return (
    <Layout className="register-main">
      <Layout className="site-layout">
        <Content
          className="content"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >
          <div className={styles["register-form-wrapper"]}>
            <div className={styles["register-form-header"]}>
              <div className={styles.logo}>
                <img src={MyDriveLogo} alt="myDrivePro logo" />
              </div>
              <h2 className={styles["register-title"]}>Регистрация</h2>
            </div>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{ remember: true }}
              className={styles["register-form"]}
            >
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "Введите корректный email!" },
                  { required: true, message: "Пожалуйста, введите ваш email!" },
                ]}
              >
                <Input placeholder="Адрес электронной почты" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста, введите ваш пароль!" },
                  { min: 8, message: "Не менее 8 символов" },
                  { pattern: /[A-Z]/, message: "Минимум одну заглавную букву" },
                  { pattern: /[a-z]/, message: "Минимум одну строчную букву" },
                  { pattern: /[0-9]/, message: "Минимум одну цифру" },
                  { pattern: /[!@#$%^&*]/, message: "Минимум один специальный символ" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Пароль" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: "Пожалуйста, подтвердите ваш пароль!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Пароли не соответствуют друг другу'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Повторите пароль" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles["register-button"]}>
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
            <div className={styles["login-link"]}>
              Уже есть аккаунт? <a href="/login">Войти</a>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RegisterPage;
