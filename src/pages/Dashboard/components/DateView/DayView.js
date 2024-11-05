import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Время начала', dataIndex: 'startTime', key: 'startTime' },
  { title: 'Марка', dataIndex: 'brand', key: 'brand' },
  { title: 'Бокс', dataIndex: 'box', key: 'box' },
  { title: 'Номер', dataIndex: 'number', key: 'number' },
  { title: 'Сотрудник', dataIndex: 'employee', key: 'employee' },
  { title: 'Сумма', dataIndex: 'sum', key: 'sum' },
];

const DayView = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default DayView;
