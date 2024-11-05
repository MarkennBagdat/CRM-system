import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { HourglassOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const ReportComponent = () => {
  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction="vertical" align="center">
          <HourglassOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
          <Title level={2}>Страница отчетности</Title>
          <Text type="secondary">Эта страница еще не доступна. Мы работаем над ней и скоро она будет готова.</Text>
        </Space>
      </Content>
    </Layout>
  );
};

export default ReportComponent;
