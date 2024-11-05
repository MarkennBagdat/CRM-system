import React, { useState } from "react";
import { Radio, DatePicker, Select, Button, Dropdown, Menu } from "antd";
import EmployeeReport from "./GeneralPages/EmployeeReport"; // Adjust the import path as necessary
import ShiftReport from "./GeneralPages/ShiftReport"; // Adjust the import path as necessary
import { DownOutlined, DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const GeneralReport = () => {
  const [reportType, setReportType] = useState("employees");
  const [dateRange, setDateRange] = useState([null, null]);
  const [employeeType, setEmployeeType] = useState("all");
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleEmployeeTypeChange = (value) => {
    const typeMap = {
      all: 'Сотрудники',
      owner: 'Владелец',
      manager: 'Менеджер',
      washer: 'Мойщик',
    };
    setEmployeeType(typeMap[value]);
  };

  const handleMenuClick = (e) => {
    setExportFormat(e.key);
  };

  const handleDownload = () => {
    // Logic for downloading the report in the selected format
  };

  const exportMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="pdf">PDF</Menu.Item>
      <Menu.Item key="excel">Excel</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="report-filter">
        <div className="choice_em_sh">
          <span>Отчет по:</span>
          <Radio.Group
            onChange={handleReportTypeChange}
            value={reportType}
            className="radio_choice"
          >
            <Radio value="employees">
              Сотрудники
            </Radio>
            <Radio value="shifts">
              Смены
            </Radio>
          </Radio.Group>
        </div>
        <div className="choice_period">
          <span>Выбранный период:</span>
          <RangePicker value={dateRange} onChange={handleDateRangeChange} />
        </div>
        <div className="choice_period_main">
          <div className="choice_period">
            <span>Сотрудники:</span>
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={handleEmployeeTypeChange}
            >
              <Option value="all">Все</Option>
              <Option value="owner">Владелец</Option>
              <Option value="manager">Менеджер</Option>
              <Option value="washer">Мойщик</Option>
            </Select>
          </div>
          <div className="choice_period">
            <span>Экспортировать:</span>
            <Dropdown overlay={exportMenu}>
              <Button>
                {exportFormat.toUpperCase()} <DownOutlined />
              </Button>
            </Dropdown>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ marginLeft: "8px" }}
            />
          </div>
        </div>
      </div>
      <div className="report-content">
        {reportType === 'employees' && <EmployeeReport dateRange={dateRange} employeeType={employeeType} />}
        {reportType === 'shifts' && <ShiftReport dateRange={dateRange} />}
      </div>
    </div>
  );
};

export default GeneralReport;
