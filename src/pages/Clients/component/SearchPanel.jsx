import React from 'react';
import { Input, Space } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const SearchPanel = ({ onSearch, onSettingsClick, onReloadClick }) => (
  <div className="search-container">
    <div className="search-input-container">
      <span className="search-span">Поиск:</span>
      <Search
        placeholder="Введите ключевые слова"
        onSearch={onSearch}
        className="search-part"
        prefix={<SearchOutlined className="search-outline" />}
      />
    </div>
    <Space className="icon-container">
      <ReloadOutlined className="search-icon icon-reload" onClick={onReloadClick} />
      <SettingOutlined className="search-icon icon-settings" onClick={onSettingsClick} />
    </Space>
  </div>
);

export default SearchPanel;
