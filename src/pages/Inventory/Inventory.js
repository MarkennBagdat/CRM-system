import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import InventoryComponent from './InventoryComponent';
import ReportComponent from './ReportComponent';

const { Content } = Layout;
const { TabPane } = Tabs;

const getTabStyle = (isSelected) => ({
  color: isSelected ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Inventory = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            <TabPane
              tab={<span style={getTabStyle(activeKey === "1")}>Склад</span>}
              key="1"
            >
              <InventoryComponent />
            </TabPane>
            <TabPane
              tab={<span style={getTabStyle(activeKey === "2")}>Отчетность</span>}
              key="2"
            >
              <ReportComponent />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Inventory;
