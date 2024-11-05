import React, { useState } from "react";
import { Select, Checkbox, Button } from "antd";

const { Option } = Select;

const CustomDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const options = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const handleChange = (checkedValues) => {
    setSelectedItems(checkedValues);
  };

  const handleDropdownVisibleChange = (open) => {
    setVisible(open);
  };

  const handleReset = () => {
    setSelectedItems([]);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const menu = (
    <div className="custom-dropdown-menu">
      <Checkbox.Group options={options} value={selectedItems} onChange={handleChange} />
      <div className="dropdown-footer">
        <Button type="link" onClick={handleReset}>Сбросить</Button>
        <Button type="primary" onClick={handleOk}>OK</Button>
      </div>
    </div>
  );

  return (
    <Select
      className="custom-select"
      placeholder="Выберите..."
      dropdownRender={() => menu}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      open={visible}
    >
      {selectedItems.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default CustomDropdown;
