import React from 'react';
import { Input, Space } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  VerticalAlignMiddleOutlined,
  SettingOutlined,
  ShrinkOutlined
} from "@ant-design/icons";

const { Search } = Input;

const SearchPanel = ({ onSearch }) => (
  <div className="search-container-in">
    <div className="search-input-container">
      <span className="search-span">Поиск:</span>
      <Search
        placeholder="Введите ключевые слова"
        onSearch={onSearch}
        className="search-part"
        prefix={<SearchOutlined className="search-outline" />}
      />
    </div>
  </div>
);

export default SearchPanel;
