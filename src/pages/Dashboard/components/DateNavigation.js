import React from 'react';
import { Button, Row, Col, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';

const DateNavigation = ({ currentDate, setCurrentDate }) => {
  const goToPreviousDay = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'days'));
  };

  const goToNextDay = () => {
    setCurrentDate(currentDate.clone().add(1, 'days'));
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  return (
    <Row justify="center" align="middle" gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
      <Col>
        <Button onClick={goToPreviousDay} icon={<LeftOutlined />} style={{ margin: 0, border: '1px solid #d9d9d9', borderRadius: '4px' }} />
      </Col>
      <Col>
        <DatePicker value={currentDate} onChange={handleDateChange} format="DD.MM.YYYY" style={{ border: '1px solid #d9d9d9' }} />
      </Col>
      <Col>
        <Button onClick={goToNextDay} icon={<RightOutlined />} style={{ margin: 0, border: '1px solid #d9d9d9', borderRadius: '4px' }} />
      </Col>
    </Row>
  );
};

export default DateNavigation;
