import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import EditUserData from './pages/users/edit-user/editing-options/EditUserData';
import EditUserPassword from './pages/users/edit-user/editing-options/EditUserPassword';

import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import ForgotLogin from './pages/login/forgot-login/ForgotLogin';
import AccessValidation from './pages/login/forgot-login/AccessValidation';

import userVerification from './utils/userVerification';

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
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/home" element={
                        <Home />
                    } />

                    <Route path="/categories" element={
                        <Categories />
                    } />
                    <Route path="/new-category" element={
                        <NewCategory />
                    } />
                    <Route path="/edit-category/:id" element={
                        <EditCategory />
                    } />

                    <Route path="/items" element={
                        <Items />
                    } />
                    <Route path="/new-item" element={
                        <NewItem />
                    } />
                    <Route path="/edit-item/:id" element={
                        <EditItem />
                    } />

                    <Route path="/providers" element={
                        <Providers />
                    } />
                    <Route path="/new-provider" element={
                        <NewProvider />
                    } />
                    <Route path="/edit-provider/:id" element={
                        <EditProvider />
                    } />

                    <Route path="/purchases" element={
                        <Purchases />
                    } />
                    <Route path="/new-purchase" element={
                        <NewPurchase />
                    } />
                    <Route path="/edit-purchase/:id" element={
                        <EditPurchase />
                    } />
                    <Route path="/detail-purchase/:id" element={
                        <DetailPurchase />
                    } />

                    <Route path="/customers" element={
                        <Customers />
                    } />
                    <Route path="/new-customer" element={
                        <NewCustomer />
                    } />
                    <Route path="/edit-customer/:id" element={
                        <EditCustomer />
                    } />

                    <Route path="/sales" element={
                        <Sales />
                    } />
                    <Route path="/new-sale" element={
                        <NewSale />
                    } />
                    <Route path="/edit-sale/:id" element={
                        <EditSale />
                    } />
                    <Route path="/detail-sale/:id" element={
                        <DetailSale />
                    } />

                    <Route path="/users" element={
                        <Users />
                    } />
                    <Route path="/new-user" element={
                        <NewUser />
                    } />
                    <Route path="/edit-user/:id" element={
                        <EditUser />
                    } />
                    <Route path="/edit-user-data/:id" element={
                        <EditUserData />
                    } />
                    <Route path="/edit-user-pass/:id" element={
                        <EditUserPassword />
                    } />
                </Routes>
            </div>
        </>
    );
}

export default App;
