import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Spin,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../assets/styles/Register.module.css";
import MyDriveLogo from "../../assets/images/myDrivePrologo.svg";

const { Content } = Layout;

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login, loading, error } = useContext(AuthContext);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      login(savedUsername, savedPassword, true)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Auto-login failed:", error.message);
        });
    }
  }, [login, navigate]);

  useEffect(() => {
    if (error) {
      openNotification("error", "Ошибка входа", "Вход не удался. Проверьте имя пользователя и пароль.");
    }
  }, [error]);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password, values.remember);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      openNotification(
        "error",
        "Ошибка входа",
        "Вход не удался. Проверьте имя пользователя и пароль."
      );
    }
  };

  return (
    <Layout className="Login_main">
      <Layout className="site-layout">
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div
            className={styles["login-form-wrapper"]}
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <div
              className={styles["login-form-header"]}
              style={{ padding: "20px 0" }}
            >
              <div className={styles.logo} style={{ marginBottom: "20px" }}>
                <img src={MyDriveLogo} alt="myDrivePro logo" />
              </div>
              <h1 className={styles["login-title"]}>Войти в систему</h1>
            </div>
            <Form
              name="normal_login"
              className={styles["login-form"]}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Пожалуйста, введите ваш email!",
                  },
                ]}
                style={{ marginBottom: "20px" }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Адрес электронной почты"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите ваш пароль!",
                  },
                ]}
                style={{ marginBottom: "20px" }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Пароль"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle={true}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "10px" }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles["login-button"]}
                  style={{ marginBottom: "10px", width: "100%" }}
                >
                  Войти
                </Button>
                <div
                  className={styles["login-form-register"]}
                  style={{ textAlign: "left" }}
                >
                  Еще не зарегистрировались?{" "}
                  <Link to="/register">Зарегистрироваться</Link>
                </div>
                <div
                  className={styles["login-form-register"]}
                  style={{ marginTop: "5px", textAlign: "left" }}
                >
                  Забыли почту или пароль?
                </div>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
