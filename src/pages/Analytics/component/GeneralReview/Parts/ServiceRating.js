import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Divider, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ServiceRating = () => {
  const [data, setData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8081/v1/calendar/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = response.data;

      // Process the orders to count the mentions of each car brand
      const carBrandCount = {};
      orders.forEach(order => {
        const carBrand = order.Brand || 'Неизвестная марка'; // Handle undefined or null car brands
        if (carBrandCount[carBrand]) {
          carBrandCount[carBrand]++;
        } else {
          carBrandCount[carBrand] = 1;
        }
      });

      const carBrandData = Object.entries(carBrandCount).map(([name, value]) => ({
        name,
        value
      }));

      setData(carBrandData);
      setTotalValue(carBrandData.reduce((acc, cur) => acc + cur.value, 0));
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#9C27B0', '#87CEEB'];

  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <text x={cx} y={cy} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan fontSize="24">{totalValue}</tspan>
        <tspan x={cx} dy="1.2em" fontSize="16">Общее количество</tspan>
      </text>
    );
  };

  return (
    <div className="service-rating-section" style={{ width: "100%" }}>
      <h3 className='h3_title'>Популярность марок автомобилей</h3>
      <Divider />
      <h4 className='h4_circle'>Популярные марки</h4>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value, entry) => (
              <span className="legend-text">
                {` ${value}`}
                <span style={{ float: 'right', marginLeft: '10px' }}>
                  {data.find(item => item.name === value).value}
                </span>
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default ServiceRating;
