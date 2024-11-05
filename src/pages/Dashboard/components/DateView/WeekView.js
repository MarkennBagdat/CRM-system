import React from 'react';
import { Calendar } from 'antd';
import moment from 'moment';

const WeekView = ({ data }) => {
  const dateCellRender = (value) => {
    const listData = data.filter(item => moment(item.date).isSame(value, 'day'));
    return (
      <ul>
        {listData.map(item => (
          <li key={item.startTime}>
            {item.startTime} {item.brand} {item.box}
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default WeekView;
