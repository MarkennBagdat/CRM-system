import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const WaveChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data}>
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WaveChart;