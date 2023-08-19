import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

import Categories from './pages/categories/Categories';
import NewCategory from './pages/categories/new-category/NewCategory';

import Items from './pages/items/Items';
import NewItem from './pages/items/new-item/NewItem';

import Providers from './pages/providers/Providers';
import NewProvider from './pages/providers/new-provider/NewProvider';

import Purchases from './pages/purchases/Purchases';
import NewPurchase from './pages/purchases/new-purchase/NewPurchase';

import Customers from './pages/customers/Customers';
import NewCustomer from './pages/customers/new-customer/NewCustomer';

import Sales from './pages/sales/Sales';
import NewSale from './pages/sales/new-sale/NewSale';

import Users from './pages/users/Users';
import NewUser from './pages/users/new-user/NewUser';

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
          <Route path="/new-category" element={<NewCategory />} />
          {/* <Route path="/edit-category/:id" element={<Categories />} /> */}

          <Route path="/items" element={<Items />} />
          <Route path="/new-item" element={<NewItem />} />
          {/* <Route path="/edit-item/:id" element={<Items />} /> */}

          <Route path="/providers" element={<Providers />} />
          <Route path="/new-provider" element={<NewProvider />} />
          {/* <Route path="/edit-provider/:id" element={<Providers />} /> */}

          <Route path="/purchases" element={<Purchases />} />
          <Route path="/new-purchase" element={<NewPurchase />} />
          {/* <Route path="/edit-purchase/:id" element={<Purchases />} /> */}

          <Route path="/customers" element={<Customers />} />
          <Route path="/new-customer" element={<NewCustomer />} />
          {/* <Route path="/edit-customer/:id" element={<Customers />} /> */}

          <Route path="/sales" element={<Sales />} />
          <Route path="/new-sale" element={<NewSale />} />
          {/* <Route path="/edit-sale/:id" element={<Sales />} /> */}

          <Route path="/users" element={<Users />} />
          <Route path="/new-user" element={<NewUser />} />
          {/* <Route path="/edit-user/:id" element={<Users />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
