import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/About';
import Product from '../components/Products/Product';
import MainLayout from '../layouts/MainLayout';
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../components/PrivateRoute';
import ActivateAccount from '../components/Registration/ActivateAccount';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import Profile from '../pages/Profile';
import ConfirmPassword from '../components/ForgetPassword/ConfirmPassword';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/cart';
import Orders from '../pages/Orders';
import AddProducts from '../pages/AddProducts';

const AppRoute = () => {
    return (
        <Routes>
            {/* Public Routes */}

            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='products' element={<Product />} />
                <Route path='about' element={<About />} />
                <Route path='shop' element={<Shop />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='activate/:uid/:token' element={<ActivateAccount />} />
                <Route path='password/reset/confirm/:uid/:token' element={<ConfirmPassword />} />
                <Route path='shop/:productId' element={<ProductDetails />} />
                </Route>
                

                {/* Private Routes */}
                
                <Route path='dashboard' element={<PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>}>
                <Route index element={
                    <Dashboard />
                } />
                <Route path='profile' element={<Profile/>} />
                <Route path='cart' element={<Cart />} />
                <Route path='orders' element={<Orders />} />
                <Route path='products/add' element={<AddProducts />} />
                </Route>
            
            
        </Routes>
    );
};

export default AppRoute;