import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Row, Col, Divider, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const BranchIncome = () => {
  const [data, setData] = useState([]);
  const [conversionRate, setConversionRate] = useState(0); // Initial value
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const [ordersResponse, inventoryResponse] = await Promise.all([
        axios.get("http://localhost:8081/v1/calendar/orders", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("http://localhost:8085/v1/warehouse", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const orders = ordersResponse.data;
      const inventory = inventoryResponse.data;

      const processedData = processOrdersAndInventory(orders, inventory);
      setData(processedData.data);
      setConversionRate(processedData.conversionRate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processOrdersAndInventory = (orders, inventory) => {
    const now = new Date();
    const startDate = period === 'week' ? new Date(now.setDate(now.getDate() - 7)) : new Date(now.setMonth(now.getMonth() - 1));

    const filteredInventory = inventory.filter(item => new Date(item.ExpirationTime) >= startDate);
    const filteredOrders = orders.filter(order => new Date(order.CreatedAt) >= startDate);

    const expenses = filteredInventory.reduce((total, item) => total + (item.Amount * item.Count), 0);
    const income = filteredOrders.reduce((total, order) => {
      if (order.Type === 'Completed' || order.Type === 'Started') {
        return total + order.Cost;
      }
      return total;
    }, 0);

    const conversionRate = expenses === 0 ? 0 : (income / expenses) * 100;

    const processedData = filteredInventory.map((item, index) => ({
      name: new Date(item.ExpirationTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      expenses: (expenses / filteredInventory.length) * (index + 1),
      income: (income / filteredInventory.length) * (index + 1),
    }));

    return { data: processedData, conversionRate: conversionRate.toFixed(2) };
  };

  return (
    <div className="branch-income-section" style={{ width: "100%", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <h3 className='h3_title'>Доходы и Расходы филиала</h3>
        </Col>
        <Col>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "16px" }}>
              <h4 style={{ margin: 0 }}>Конверсия</h4>
              <h4 style={{ margin: 0, color: "#1890ff" }}>{conversionRate}%</h4>
            </div>
            <PieChart width={50} height={50}>
              <Pie
                data={[{ value: conversionRate }, { value: 100 - conversionRate }]}
                cx={25}
                cy={25}
                innerRadius={15}
                outerRadius={20}
                fill="#1890ff"
                paddingAngle={5}
                dataKey="value"
              >
                <Cell key={`cell-0`} fill="#1890ff" />
                <Cell key={`cell-1`} fill="#f0f0f0" />
              </Pie>
            </PieChart>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: "16px 0" }} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#1890ff" name="Расходы" />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Доходы" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BranchIncome;
