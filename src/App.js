import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Services from "./pages/Services/Services";
import Clients from "./pages/Clients/Clients";
import Analytics from "./pages/Analytics/Analytics";
import Inventory from "./pages/Inventory/Inventory";
import Employees from "./pages/Employees/Employees";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/Help";
import './assets/styles/main.scss';
import './assets/styles/index.css';
import './assets/styles/Login.module.css';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="clients" element={<Clients />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="employees" element={<Employees />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
      <Router>
        <AppContent />
      </Router>
  );
};

export default App;
