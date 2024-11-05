import React from 'react';
import { Progress } from 'antd';

const SatisfactionBar = ({ percent }) => {
  return <Progress percent={percent} showInfo={false} />;
};

export default SatisfactionBar;
