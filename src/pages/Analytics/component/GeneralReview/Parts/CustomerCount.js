import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Divider } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import moment from 'moment';

const CustomerCount = ({ date }) => {
  const [newCustomers, setNewCustomers] = useState([]);
  const [returningCustomers, setReturningCustomers] = useState([]);
  const [newCustomersData, setNewCustomersData] = useState([]);
  const [returningCustomersData, setReturningCustomersData] = useState([]);

  useEffect(() => {
    fetchClientData();
  }, [date]);

  const fetchClientData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8081/v1/calendar/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.length === 0) {
        console.warn("API вернул пустой массив. Проверьте сервер.");
      }

      processClientData(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных о клиентах:", error);
    }
  };

  const processClientData = (orders) => {
    const newClients = [];
    const returningClients = [];
    const clientCarNumbers = new Map();

    // Фильтруем заказы за последние 7 дней
    const filteredOrders = orders.filter(order => {
      const createdAt = moment(order.CreatedAt);
      return createdAt.isSameOrAfter(moment(date).subtract(6, 'days'), 'day') && createdAt.isSameOrBefore(moment(date), 'day');
    });
    
    filteredOrders.forEach(order => {
      const carNumber = order.CarNumber;
      if (clientCarNumbers.has(carNumber)) {
        const existingClient = clientCarNumbers.get(carNumber);
        existingClient.OrderCount += 1;
        if (existingClient.OrderCount > 1 && !returningClients.includes(existingClient)) {
          returningClients.push(existingClient);
        }
      } else {
        const client = { ...order, OrderCount: 1 };
        clientCarNumbers.set(carNumber, client);
        newClients.push(client);
      }
    });

    const updatedNewClients = newClients.filter(client => !returningClients.includes(client));

    setNewCustomers(updatedNewClients);
    setReturningCustomers(returningClients);
    setNewCustomersData(generatePeriodData(filteredOrders, updatedNewClients));
    setReturningCustomersData(generatePeriodData(filteredOrders, returningClients));
  };

  const generatePeriodData = (orders, clients) => {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const periodData = Array(7).fill(0).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return {
        name: daysOfWeek[date.getDay()],
        value: 0
      };
    }).reverse();

    clients.forEach(client => {
      const date = new Date(client.CreatedAt);
      const dayName = daysOfWeek[date.getDay()];
      const periodDatum = periodData.find(datum => datum.name === dayName);
      if (periodDatum) {
        periodDatum.value += 1;
      }
    });

    return periodData;
  };

  const columns = [
    {
      title: 'Номер',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Данные',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const dataNewCustomers = newCustomers.map((customer, index) => ({
    key: index + 1,
    name: `${customer.CarNumber}`
  }));

  const dataReturningCustomers = returningCustomers.map((customer, index) => ({
    key: index + 1,
    name: `${customer.CarNumber}`
  }));

  return (
    <div className="customer-count-section">
      <h3 className='h3_title'>Количество клиентов</h3>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <h3 className='h3_count'>Новые клиенты <i className="info-icon" /></h3>
          <p className="p-amount">{newCustomers.length}</p>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={newCustomersData}>
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorNew)" />
            </AreaChart>
          </ResponsiveContainer>
          <Table dataSource={dataNewCustomers} columns={columns} pagination={{ pageSize: 5 }} showHeader={true} />
        </Col>
        <Col span={12}>
          <h3 className='h3_count'>Возвращающиеся клиенты <i className="info-icon" /></h3>
          <p className="p-amount">{returningCustomers.length}</p>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={returningCustomersData}>
              <defs>
                <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorReturning)" />
            </AreaChart>
          </ResponsiveContainer>
          <Table dataSource={dataReturningCustomers} columns={columns} pagination={{ pageSize: 5 }} showHeader={true} />
        </Col>
      </Row>
    </div>
  );
};

export default CustomerCount;
