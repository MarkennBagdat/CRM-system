import React, { useState } from "react";
import { Layout, Form, Input, Button, Rate, Typography, Tabs, notification } from "antd";
import { PhoneOutlined, CloseCircleOutlined, WechatOutlined } from "@ant-design/icons";
import emailjs from 'emailjs-com';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const { TabPane } = Tabs;

const getMenuItemStyle = (isSelected) => ({
  borderBottom: isSelected ? "2px solid rgba(255, 255, 255, 1)" : "none",
  color: isSelected ? "rgba(3, 149, 255, 1)" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Help = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("1");

  const clearInput = () => {
    setInputValue("");
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    emailjs.send(
      'service_xtlq1io', // Replace with your EmailJS service ID
      'template_l154wrr', // Replace with your EmailJS template ID
      {
        to_name: 'Recipient Name', // Replace with the actual recipient name
        from_name: values.name,
        phone: values.phone,
        company: values.company,
        rating: values.rating,
        message: values.feedback,
      },
      'Ozeb9MC8fkNga_FQy' // Replace with your EmailJS public key
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      notification.success({
        message: 'Успешно',
        description: 'Форма успешно отправлена.',
        placement: 'topRight',
      });
    }).catch((err) => {
      console.error('FAILED...', err);
      notification.error({
        message: 'Ошибка',
        description: 'Ошибка при отправке формы.',
        placement: 'topRight',
      });
    });
  };

  const onChatClick = () => {};

  const handleMouseEnter = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      background: "rgba(3, 149, 255, 0.8)",
    }));
  };

  const handleMouseLeave = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      background: "rgba(3, 149, 255, 1)",
    }));
  };

  const [buttonStyle, setButtonStyle] = useState({
    width: "114px",
    height: "40px",
    padding: "6.4px 15px",
    border: "1px solid transparent",
    borderRadius: "2px 0px 0px 0px",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    textAlign: "center",
    background: "rgba(3, 149, 255, 1)",
    color: "#FFFFFF",
    boxShadow: "none",
  });

  return (
    <Layout>
      <Content>
        <div style={{ background: "#fff" }}>
          <Tabs activeKey={selectedKey} onChange={setSelectedKey}>
            <TabPane
              tab={
                <span style={getMenuItemStyle(selectedKey === "1")}>
                  Обратная связь
                </span>
              }
              key="1"
            >
              <div
                style={{
                  padding: "24px",
                  maxWidth: "700px",
                  marginTop: "60px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Title
                  level={2}
                  style={{ textAlign: "center", marginBottom: "24px" }}
                >
                  <span
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "24px",
                      fontWeight: 500,
                    }}
                  >
                    Форма обратной связи
                  </span>
                  <br />
                  <span
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    (для тестировщиков)
                  </span>
                </Title>

                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                >
                  <Form.Item
                    label={
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          marginBottom: "10px",
                        }}
                      >
                        Имя
                      </span>
                    }
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите ваше имя!",
                      },
                    ]}
                    required={false}
                  >
                    <Input
                      placeholder="Введите ваше имя"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      suffix={
                        inputValue && (
                          <CloseCircleOutlined
                            onClick={clearInput}
                            style={{
                              color: "rgba(255, 255, 255, 1)",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              fontSize: "14px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              borderColor: "rgba(217, 217, 217, 1)",
                            }}
                          />
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          marginBottom: "10px",
                        }}
                      >
                        Номер телефона
                      </span>
                    }
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Пожалуйста, введите ваш номер телефона!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={<PhoneOutlined />}
                      placeholder="+1 (234) 5678"
                      suffix={
                        inputValue && (
                          <CloseCircleOutlined
                            onClick={clearInput}
                            style={{
                              color: "rgba(255, 255, 255, 1)",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              fontSize: "14px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              borderColor: "rgba(217, 217, 217, 1)",
                            }}
                          />
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          marginBottom: "10px",
                        }}
                      >
                        Автомойка / детейлинг
                      </span>
                    }
                    name="company"
                  >
                    <Input
                      placeholder="Название компании"
                      suffix={
                        inputValue && (
                          <CloseCircleOutlined
                            onClick={clearInput}
                            style={{
                              color: "rgba(255, 255, 255, 1)",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              fontSize: "14px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              borderColor: "rgba(217, 217, 217, 1)",
                            }}
                          />
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          marginBottom: "10px",
                        }}
                      >
                        Оценка платформы
                      </span>
                    }
                    name="rating"
                  >
                    <Rate />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          textAlign: "left",
                          marginBottom: "10px",
                        }}
                      >
                        Что думаете о нашей платформе?
                      </span>
                    }
                    name="feedback"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Если у вас есть какие-либо жалобы или предложения, пожалуйста, напишите их сюда"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "22px",
                        textAlign: "left",
                      }}
                      suffix={
                        inputValue && (
                          <CloseCircleOutlined
                            onClick={clearInput}
                            style={{
                              color: "rgba(255, 255, 255, 1)",
                              backgroundColor: "rgba(217, 217, 217, 1)",
                              fontSize: "14px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              borderColor: "rgba(217, 217, 217, 1)",
                            }}
                          />
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={buttonStyle}
                    >
                      Отправить
                    </Button>
                  </Form.Item>
                </Form>
                <div
                  style={{
                    position: "absolute",
                    right: "20px",
                    bottom: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<WechatOutlined />}
                    size="large"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      color: "rgba(3, 149, 255, 1)",
                      border: "1px solid rgba(0, 0, 0, 0.25)",
                      boxShadow: "none",
                      width: "70px",
                      height: "70px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={onChatClick}
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Help;
