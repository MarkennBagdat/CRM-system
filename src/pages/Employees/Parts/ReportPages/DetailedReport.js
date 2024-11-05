import React, { useState } from 'react';
import { Table, Input, DatePicker, Select, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const data = [
  {
    key: "1",
    name: "Андрей Зимиров",
    position: "Владелец автосервиса",
    phone: "+77758394203",
    startDate: "31.11.2023",
    shifts: 141,
  },
  {
    key: "2",
    name: "Айдос Айдалиев",
    position: "Менеджер филиала",
    phone: "+77015163748",
    startDate: "10.12.2023",
    shifts: 180,
  },
  {
    key: "3",
    name: "Жанна Оразалиева",
    position: "Мойщик",
    phone: "+77758394203",
    startDate: "31.11.2023",
    shifts: 141,
  },
  {
    key: "4",
    name: "Айбек Байганов",
    position: "Мойщик",
    phone: "+77003363754",
    startDate: "11.11.2023",
    shifts: 150,
  },
  // Add other data here
];

const flattenedData = data.map(employee => ({
  ...employee,
  shifts: 12, // Sample data for shifts
  salary: '0.00 тг', // Sample data for salary
  commission: '0.00 тг', // Sample data for commission
  deductions: '0.00 тг', // Sample data for deductions
  total: '0.00 тг' // Sample data for total
}));

const DetailedReport = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [employeeType, setEmployeeType] = useState('all');
  const [filteredData, setFilteredData] = useState(flattenedData);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleEmployeeTypeChange = (value) => {
    setEmployeeType(value);
    if (value === 'all') {
      setFilteredData(flattenedData);
    } else {
      setFilteredData(flattenedData.filter(emp => emp.position === value));
    }
  };

  const columns = [
    {
      title: 'Смена',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index > 0 && value === filteredData[index - 1].startDate) {
          obj.props.rowSpan = 0;
        } else {
          obj.props.rowSpan = filteredData.filter(item => item.startDate === value).length;
        }
        return obj;
      },
    },
    {
      title: 'Сотрудники',
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
      <div className="report-filter">
        <span>Выбранный период:</span>
        <RangePicker value={dateRange} onChange={handleDateRangeChange} />
        <div className="choice_period">
          <span>Сотрудники:</span>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleEmployeeTypeChange}
          >
            <Option value="all">Все</Option>
            <Option value="Владелец автосервиса">Владелец</Option>
            <Option value="Менеджер филиала">Менеджер</Option>
            <Option value="Мойщик">Мойщик</Option>
          </Select>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
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
                <Table.Summary.Cell>Итого</Table.Summary.Cell>
                <Table.Summary.Cell>{totalShifts}</Table.Summary.Cell>
                <Table.Summary.Cell>{totalSalary.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalCommission.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalDeductions.toFixed(2)} тг</Table.Summary.Cell>
                <Table.Summary.Cell>{totalOverall.toFixed(2)} тг</Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      <div style={{ marginTop: '16px' }} className='income_sum'>
        <span>Всего доходов, тг: </span>
        <Input type="text" value="0.00" readOnly className="income_input" />
      </div>
    </div>
  );
};

export default DetailedReport;
