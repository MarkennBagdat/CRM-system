import React from 'react';
import { Table, Select, Button, Dropdown, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const dataSource = [
  {
    key: '1',
    name: 'Жанна Оразалиева',
    shifts: 14,
    salary: '0.00 тг',
    commission: '0.00 тг',
    deductions: '0.00 тг',
    total: '0.00 тг'
  },
  {
    key: '2',
    name: 'Айбек Байганов',
    shifts: 6,
    salary: '0.00 тг',
    commission: '0.00 тг',
    deductions: '0.00 тг',
    total: '0.00 тг'
  },
  // Add more data here as needed
];

const EmployeeReport = ({ dateRange, employeeType }) => {
  const columns = [
    {
      title: employeeType === 'all' ? 'Сотрудники' : employeeType,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Кол-во смен',
      dataIndex: 'shifts',
      key: 'shifts',
    },
    {
      title: 'Оклад',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: '% с записей',
      dataIndex: 'commission',
      key: 'commission',
    },
    {
      title: 'Вычеты/Начисления',
      dataIndex: 'deductions',
      key: 'deductions',
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        summary={pageData => {
          let totalShifts = 0;
          let totalSalary = 0;
          let totalCommission = 0;
          let totalDeductions = 0;
          let totalOverall = 0;

          pageData.forEach(({ shifts, salary, commission, deductions, total }) => {
            totalShifts += shifts;
            totalSalary += parseFloat(salary);
            totalCommission += parseFloat(commission);
            totalDeductions += parseFloat(deductions);
            totalOverall += parseFloat(total);
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>{totalSalary.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalCommission.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalDeductions.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalOverall.toFixed(2)} тг</Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      <div style={{ marginTop: '16px', }} className='income_sum'>
        <span>Всего доходов, тг: </span>
        <Input type="text" value="0.00" readOnly className="income_input" />
      </div>
    </div>
  );
};

export default EmployeeReport;
