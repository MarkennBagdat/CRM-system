import React, { useState, useEffect } from "react";
import { Layout, Tabs, Divider } from "antd";
import EmployeesList from "./Parts/EmployeesList";
import SalaryCalculation from "./Parts/SalaryCalculation";
import "../../assets/styles/main.scss";

const { Content } = Layout;
const { TabPane } = Tabs;

const getTabStyle = (isSelected) => ({
  color: isSelected ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Employees = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            <TabPane
              tab={
                <span style={getTabStyle(activeKey === "1")}>Сотрудники</span>
              }
              key="1"
            >
              <EmployeesList />
            </TabPane>
            <TabPane
              tab={
                <span style={getTabStyle(activeKey === "2")}>Расчет зарплат</span>
              }
              key="2"
            >
              <SalaryCalculation />
            </TabPane>
          </Tabs>
          <Divider />
        </div>
      </Content>
    </Layout>
  );
};

export default Employees;
