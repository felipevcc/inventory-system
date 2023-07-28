import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Items from './pages/Items';
import Providers from './pages/Providers';
import Purchases from './pages/Purchases';
import Customers from './pages/Customers';
import Sales from './pages/Sales';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ForgotLogin from './pages/ForgotLogin';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-login" element={<ForgotLogin />} />
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
