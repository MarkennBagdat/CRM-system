import React, { useState, useEffect } from "react";
import { Card, Col, Row, Select, message } from "antd";
import axios from "axios";
import WaveChart from "./diagrams/WaveChart";
import SatisfactionBar from "./diagrams/SatisfactionBar";
import moment from "moment";

const { Option } = Select;

const Overview = () => {
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [numberOfRecords, setNumberOfRecords] = useState(0);
  const [averageCheck, setAverageCheck] = useState(0);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("day");

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8081/v1/calendar/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredOrders = response.data.filter(order => {
        const orderDate = moment(order.StartDate); // Assuming StartDate is the field that contains the start time
        if (selectedPeriod === "day") {
          return orderDate.isSame(moment(), "day");
        } else if (selectedPeriod === "week") {
          return orderDate.isSame(moment(), "week");
        } else if (selectedPeriod === "month") {
          return orderDate.isSame(moment(), "month");
        } else if (selectedPeriod === "year") {
          return orderDate.isSame(moment(), "year");
        }
        return false;
      });

      setData(filteredOrders);
      calculateMetrics(filteredOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateMetrics = (orders) => {
    const income = orders.reduce((sum, order) => sum + order.Cost, 0);
    const count = orders.length;
    const avgCheck = count === 0 ? 0 : income / count;

    // Calculate customer satisfaction
    const clientOrderCount = {};
    orders.forEach(order => {
      if (clientOrderCount[order.ClientId]) {
        clientOrderCount[order.ClientId]++;
      } else {
        clientOrderCount[order.ClientId] = 1;
      }
    });
    const totalClients = Object.keys(clientOrderCount).length;
    const returningClients = Object.values(clientOrderCount).filter(count => count > 1).length;
    const satisfaction = totalClients === 0 ? 0 : (returningClients / totalClients) * 100;

    setTotalIncome(income);
    setNumberOfRecords(count);
    setAverageCheck(avgCheck);
    setCustomerSatisfaction(satisfaction);
  };

  return (
    <div className="overview-section">
      <h2>Аналитика по филиалу</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card className="overview-card">
            <div className="text_card">
              <h3>Общий доход</h3>
              <p className="income-amount">T {totalIncome.toFixed(2)}</p>
            </div>
            {/* <div className="select-container">
              <Select value={selectedPeriod} onChange={setSelectedPeriod} className="select-period">
                <Option value="day">За день</Option>
                <Option value="week">За неделю</Option>
                <Option value="month">За месяц</Option>
                <Option value="year">За год</Option>
              </Select>
            </div> */}
          </Card>
        </Col>
        <Col span={6}>
          <Card className="overview-card">
            <div className="text_card">
              <h3>Кол-во записей</h3>
              <p className="income-amount">{numberOfRecords}</p>
              <WaveChart data={data} />
            </div>
            {/* <div className="select-container">
              <Select value={selectedPeriod} onChange={setSelectedPeriod} className="select-period">
                <Option value="day">За день</Option>
                <Option value="week">За неделю</Option>
                <Option value="month">За месяц</Option>
                <Option value="year">За год</Option>
              </Select>
            </div> */}
          </Card>
        </Col>
        <Col span={6}>
          <Card className="overview-card">
            <div className="text_card">
              <h3>Средний чек</h3>
              <p className="income-amount">T {averageCheck.toFixed(2)}</p>
            </div>
            {/* <div className="select-container">
              <Select value={selectedPeriod} onChange={setSelectedPeriod} className="select-period">
                <Option value="day">За день</Option>
                <Option value="week">За неделю</Option>
                <Option value="month">За месяц</Option>
                <Option value="year">За год</Option>
              </Select>
            </div> */}
          </Card>
        </Col>
        <Col span={6}>
          <Card className="overview-card">
            <div className="text_card">
              <h3>Удовлетворенность клиентов</h3>
              <p className="income-amount">{customerSatisfaction.toFixed(2)}%</p>
              <SatisfactionBar percent={customerSatisfaction} />
            </div>
            {/* <div className="select-container">
              <Select value={selectedPeriod} onChange={setSelectedPeriod} className="select-period">
                <Option value="day">За день</Option>
                <Option value="week">За неделю</Option>
                <Option value="month">За месяц</Option>
                <Option value="year">За год</Option>
              </Select>
            </div> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
