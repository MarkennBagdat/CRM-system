import React from 'react';
import { Table, Input } from 'antd';

const data = [
  {
    key: '1',
    shift: '03.05.2024 9:00 - 21:00',
    employees: [
      { key: '1', shift: '03.05.2024 9:00 - 21:00', name: 'Жанна Оразалиева', shifts: 14, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '2', shift: '03.05.2024 9:00 - 21:00', name: 'Айбек Байганов', shifts: 6, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '3', shift: '03.05.2024 9:00 - 21:00', name: 'Нурсултан Уалиев', shifts: 15, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '4', shift: '03.05.2024 9:00 - 21:00', name: 'Владимир Пушкин', shifts: 15, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '5', shift: '03.05.2024 9:00 - 21:00', name: 'Мади Султан', shifts: 19, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '6', shift: '03.05.2024 9:00 - 21:00', name: 'Арюжан Охотова', shifts: 3, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '7', shift: '03.05.2024 9:00 - 21:00', name: 'Ахмад Галиев', shifts: 9, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '8', shift: '03.05.2024 9:00 - 21:00', name: 'Арюхан Исакова', shifts: 11, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' }
    ]
  },
  {
    key: '2',
    shift: '04.05.2024 9:00 - 21:00',
    employees: [
      { key: '1', shift: '04.05.2024 9:00 - 21:00', name: 'Жанна Оразалиева', shifts: 14, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '2', shift: '04.05.2024 9:00 - 21:00', name: 'Айбек Байганов', shifts: 6, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '3', shift: '04.05.2024 9:00 - 21:00', name: 'Нурсултан Уалиев', shifts: 15, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '4', shift: '04.05.2024 9:00 - 21:00', name: 'Владимир Пушкин', shifts: 15, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '5', shift: '04.05.2024 9:00 - 21:00', name: 'Мади Султан', shifts: 19, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '6', shift: '04.05.2024 9:00 - 21:00', name: 'Арюжан Охотова', shifts: 3, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '7', shift: '04.05.2024 9:00 - 21:00', name: 'Ахмад Галиев', shifts: 9, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' },
      { key: '8', shift: '04.05.2024 9:00 - 21:00', name: 'Арюхан Исакова', shifts: 11, salary: '0.00 тг', commission: '0.00 тг', deductions: '0.00 тг', total: '0.00 тг' }
    ]
  },
  // More shift data
];

const flattenedData = data.reduce((acc, shift) => {
  const employeesWithShift = shift.employees.map(employee => ({ ...employee, shift: shift.shift }));
  return acc.concat(employeesWithShift);
}, []);

const columns = [
  {
    title: 'Смена',
    dataIndex: 'shift',
    key: 'shift',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index > 0 && value === flattenedData[index - 1].shift) {
        obj.props.rowSpan = 0;
      } else {
        obj.props.rowSpan = flattenedData.filter(item => item.shift === value).length;
      }
      return obj;
    },
  },
  {
    title: 'Мойщики',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Записи',
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

const ShiftReport = ({ dateRange }) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={flattenedData}
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
      <div style={{ marginTop: '16px', }} className='income_sum'>
        <span>Всего доходов, тг: </span>
        <Input type="text" value="0.00" readOnly className="income_input" />
      </div>
    </div>
  );
};

export default ShiftReport;
