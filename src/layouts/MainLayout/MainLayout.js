import React, { useState } from "react";
import { Layout } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import CustomSider from "../../components/Sider/CustomSider";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Services from "../../pages/Services/Services";
import Clients from "../../pages/Clients/Clients";
import Analytics from "../../pages/Analytics/Analytics";
import Inventory from "../../pages/Inventory/Inventory";
import Employees from "../../pages/Employees/Employees";
import Settings from "../../pages/Settings/Settings";
import Help from "../../pages/Help/Help";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Layout>
      {!isLoginPage && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <CustomSider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Sider>
      )}
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
