import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

import Categories from './pages/categories/Categories';
import NewCategory from './pages/categories/new-category/NewCategory';
import EditCategory from './pages/categories/edit-category/EditCategory';

import Items from './pages/items/Items';
import NewItem from './pages/items/new-item/NewItem';
import EditItem from './pages/items/edit-item/EditItem';

import Providers from './pages/providers/Providers';
import NewProvider from './pages/providers/new-provider/NewProvider';
import EditProvider from './pages/providers/edit-provider/EditProvider';

import Purchases from './pages/purchases/Purchases';
import NewPurchase from './pages/purchases/new-purchase/NewPurchase';
import EditPurchase from './pages/purchases/edit-purchase/EditPurchase';
import DetailPurchase from './pages/purchases/detail-purchase/DetailPurchase';

import Customers from './pages/customers/Customers';
import NewCustomer from './pages/customers/new-customer/NewCustomer';
import EditCustomer from './pages/customers/edit-customer/EditCustomer';

import Sales from './pages/sales/Sales';
import NewSale from './pages/sales/new-sale/NewSale';
import EditSale from './pages/sales/edit-sale/EditSale';
import DetailSale from './pages/sales/detail-sale/DetailSale';

import Users from './pages/users/Users';
import NewUser from './pages/users/new-user/NewUser';
import EditUser from './pages/users/edit-user/EditUser';

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
          <Route path="/*" element={
            <MainLayout />
          } />
        </Routes>
      </div>
    </Router>
  );
}

const MainLayout = () => {
  let isAuthenticated = false;
  let isAdmin = false;
  let user = localStorage.getItem("user");
  try {
    user = JSON.parse(user);
    if (user) {
      isAuthenticated = true;
      if (user.admin === true) {
        isAdmin = true;
      }
    }
  } catch (error) {
    isAuthenticated = false;
  }
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/home" element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          } />

          <Route path="/categories" element={
            isAuthenticated ? <Categories /> : <Navigate to="/login" />
          } />
          <Route path="/new-category" element={
            isAuthenticated ? <NewCategory /> : <Navigate to="/login" />
          } />
          <Route path="/edit-category/:id" element={
            isAuthenticated ? <EditCategory /> : <Navigate to="/login" />
          } />

          <Route path="/items" element={
            isAuthenticated ? <Items /> : <Navigate to="/login" />
          } />
          <Route path="/new-item" element={
            isAuthenticated ? <NewItem /> : <Navigate to="/login" />
          } />
          <Route path="/edit-item/:id" element={
            isAuthenticated ? <EditItem /> : <Navigate to="/login" />
          } />

          <Route path="/providers" element={
            isAuthenticated ? <Providers /> : <Navigate to="/login" />
          } />
          <Route path="/new-provider" element={
            isAuthenticated ? <NewProvider /> : <Navigate to="/login" />
          } />
          <Route path="/edit-provider/:id" element={
            isAuthenticated ? <EditProvider /> : <Navigate to="/login" />
          } />

          <Route path="/purchases" element={
            isAuthenticated ? <Purchases /> : <Navigate to="/login" />
          } />
          <Route path="/new-purchase" element={
            isAuthenticated ? <NewPurchase /> : <Navigate to="/login" />
          } />
          <Route path="/edit-purchase/:id" element={
            isAuthenticated ? <EditPurchase /> : <Navigate to="/login" />
          } />
          <Route path="/detail-purchase/:id" element={
            isAuthenticated ? <DetailPurchase /> : <Navigate to="/login" />
          } />

          <Route path="/customers" element={
            isAuthenticated ? <Customers /> : <Navigate to="/login" />
          } />
          <Route path="/new-customer" element={
            isAuthenticated ? <NewCustomer /> : <Navigate to="/login" />
          } />
          <Route path="/edit-customer/:id" element={
            isAuthenticated ? <EditCustomer /> : <Navigate to="/login" />
          } />

          <Route path="/sales" element={
            isAuthenticated ? <Sales /> : <Navigate to="/login" />
          } />
          <Route path="/new-sale" element={
            isAuthenticated ? <NewSale /> : <Navigate to="/login" />
          } />
          <Route path="/edit-sale/:id" element={
            isAuthenticated ? <EditSale /> : <Navigate to="/login" />
          } />
          <Route path="/detail-sale/:id" element={
            isAuthenticated ? <DetailSale /> : <Navigate to="/login" />
          } />

          <Route path="/users" element={
            isAuthenticated ? (
              isAdmin ? <Users /> : <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/new-user" element={
            isAuthenticated ? (
              isAdmin ? <NewUser /> : <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/edit-user/:id" element={
            isAuthenticated ? <EditUser /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
