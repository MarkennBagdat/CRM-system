import React from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import "../../../../assets/styles/App.css"

const MonthView = ({ data }) => {
  const monthCellRender = (value) => {
    const listData = data.filter(item => moment(item.date).isSame(value, 'month'));
    const orderCount = listData.length;
    return orderCount ? (
      <div className="notes-month">
        <section>{orderCount} заказов</section>
      </div>
    ) : null;
  };

  return (
    <Calendar
      dateCellRender={monthCellRender}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current.month(i);
          months.push(localeData.monthsShort(current));
        }

        for (let index = start; index < end; index++) {
          monthOptions.push(
            <Select.Option key={`${index}`}>
              {months[index]}
            </Select.Option>,
          );
        }

        const month = value.month();

        return (
          <div style={{ padding: 8 }}>
            <Row gutter={8}>
              <Col>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  value={String(month)}
                  onChange={(selectedMonth) => {
                    const newValue = value.clone();
                    newValue.month(parseInt(selectedMonth, 10));
                    onChange(newValue);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>
            </Row>
          </div>
        );
      }}
    />
  );
};

export default MonthView;
