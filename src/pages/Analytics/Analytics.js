import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import GeneralReview from "./component/GeneralReview/GeneralReview";
import Reports from './component/Reports/Reports';

const { TabPane } = Tabs;
const { Content } = Layout;

const getTabStyle = (isSelected) => ({
  color: isSelected ? "#1890ff" : "rgba(0, 0, 0, 0.65)",
  padding: "0 30px",
});

const Analytics = () => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: "#fff", minHeight: 280 }}>
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            <TabPane
              tab={<span style={getTabStyle(activeKey === "1")}>Общий обзор</span>}
              key="1"
            >
              <GeneralReview />
            </TabPane>
            <TabPane
              tab={<span style={getTabStyle(activeKey === "2")}>Отчетность</span>}
              key="2"
            >
              <Reports />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Analytics;
