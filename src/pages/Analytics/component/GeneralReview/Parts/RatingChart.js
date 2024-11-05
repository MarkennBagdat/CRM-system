import React, { useState, useEffect } from 'react';
import { Col, Row, Tabs, Table, DatePicker, message } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const RatingChart = () => {
  const [dataCars, setDataCars] = useState([]);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8082/v1/clients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const carData = processCarData(response.data);
      setDataCars(carData);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const processCarData = (clients) => {
    const carTypeCounts = clients.reduce((acc, client) => {
      const { CarBodyType } = client;
      acc[CarBodyType] = acc[CarBodyType] ? acc[CarBodyType] + 1 : 1;
      return acc;
    }, {});

    return Object.entries(carTypeCounts).map(([key, value]) => ({
      key,
      name: key,
      value
    }));
  };

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => (
        <div className={`index-circle index-${index + 1}`}>{index + 1}</div>
      ),
    },
    {
      title: 'Рейтинг кузовов',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <div className="rating-chart-section">
      <Tabs
        defaultActiveKey="1"
        
      >
        <TabPane tab="Рейтинг кузовов" key="1" style={{ margin: "8px 24px 15px" }}>
          <Row gutter={16}>
            <Col span={16}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataCars}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend formatter={() => "Тип кузова"} />
                  <Bar dataKey="value" fill="rgba(24, 144, 255, 1)" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col span={8}>
              <Table dataSource={dataCars} columns={columns} pagination={false} showHeader={false} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RatingChart;
