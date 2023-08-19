import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Categories from './pages/categories/Categories';
import Items from './pages/items/Items';
import Providers from './pages/providers/Providers';
import Purchases from './pages/purchases/Purchases';
import Customers from './pages/customers/Customers';
import Sales from './pages/sales/Sales';
import Users from './pages/users/Users';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import ForgotLogin from './pages/login/forgot-login/ForgotLogin';
import AccessValidation from './pages/login/forgot-login/AccessValidation';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-login" element={<ForgotLogin />} />
          <Route path="/access-validation" element={<AccessValidation />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/items" element={<Items />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
