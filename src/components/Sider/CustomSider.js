import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Button, Divider } from "antd";
import {
  LayoutOutlined,
  ProfileOutlined,
  CarOutlined,
  PieChartOutlined,
  ToolOutlined,
  TeamOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const CustomSider = ({ collapsed, toggleCollapsed, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleItemClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className={`sider_items ${collapsed ? "collapsed" : ""}`}>
      <div className="demo-logo-vertical">
        <Button
          type="text"
          icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
          onClick={toggleCollapsed}
          style={{
            margin: "20px 0px 10px",
            left: collapsed ? "21px" : "16px",
          }}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "/",
            icon: <LayoutOutlined />,
            label: "Записи",
          },
          {
            key: "/services",
            icon: <ProfileOutlined />,
            label: "Услуги",
          },
          {
            key: "/clients",
            icon: <CarOutlined />,
            label: "Клиенты",
          },
          {
            key: "/analytics",
            icon: <PieChartOutlined />,
            label: "Аналитика",
          },
          {
            key: "/inventory",
            icon: <ToolOutlined />,
            label: "Склад",
          },
          {
            key: "/employees",
            icon: <TeamOutlined />,
            label: "Сотрудники",
          },
          {
            key: "/settings",
            icon: <SettingOutlined />,
            label: "Настройки",
          },
          {
            key: "/help",
            icon: <QuestionCircleOutlined />,
            label: "Помощь",
          },
        ]}
        onClick={handleItemClick}
      />
      <Divider />
    </div>
  );
};

export default CustomSider;
