import React from "react";
import { Layout, Typography, Space } from "antd";
import { HourglassOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const SalaryCalculation = () => {
  return (
    // const [activeTab, setActiveTab] = useState("general");
    // <div>
    //   <div className="tabs-container">
    //     <div className="tabs">
    //       <span>Расчет зарплат сотрудников:</span>
    //       <button
    //         className={`tab-button ${activeTab === "general" ? "active" : ""}`}
    //         onClick={() => setActiveTab("general")}
    //       >
    //         Общий отчет
    //       </button>
    //       <button
    //         className={`tab-button ${activeTab === "detailed" ? "active" : ""}`}
    //         onClick={() => setActiveTab("detailed")}
    //       >
    //         Детальный отчет
    //       </button>
    //     </div>
    //     <div className="report-container">
    //       {activeTab === "general" && <GeneralReport />}
    //       {activeTab === "detailed" && <DetailedReport />}
    //     </div>
    //   </div>
    // </div>

    <Layout
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Space direction="vertical" align="center">
          <HourglassOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
          <Title level={2}>Страница расчета зарплат</Title>
          <Text type="secondary">
            Эта страница еще не доступна. Мы работаем над ней и скоро она будет
            готова.
          </Text>
        </Space>
      </Content>
    </Layout>
  );
};

export default SalaryCalculation;
