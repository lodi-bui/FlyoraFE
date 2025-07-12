import React from 'react';
import { Routes, Route} from 'react-router-dom';
import ShopPage from './pages/shop/ShopPage';
import HomePage from './pages/home/HomePage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CheckoutPage    from './pages/checkout/CheckoutPage';
import CheckoutConfirm from './pages/checkout/CheckoutConfirm';
import Chatbotbox from './components/chatBox/ChatbotBox';
import InspectionPolicy from './pages/policy/InspectionPolicy';
import PrivacyPolicy from './pages/policy/PrivacyPolicy';
import DeliveryPolicy from './pages/policy/DeliveryPolicy';
import NewsPage from './pages/news/NewsPage';

import CartPage from './pages/cart/CartPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';

import OrderHistoryPage from './pages/order/OrderHistoryPage';
import OrderDetailsPage from './pages/order/OrderDetailsPage';
import ProfilePage from './pages/profile/ProfilePage';

import AboutUsPage from 'pages/aboutUs/AboutUsPage';
import ContactUsPage from 'pages/contactUs/ContactUsPage';
import UserActivityLogPage from 'pages/admin/systemManagement/userLog/UserActivityLogPage'; 

import UserManagement from './pages/admin/userMgm/UserManagement';
import ContentPage from './pages/admin/content/ContentPage';

import ProductManagement from 'pages/manager/product/ProductManagement';
import AddProduct from 'pages/manager/product/AddProduct';
function App() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/cart" element={<CartPage />} />
 
        <Route path="/checkout" element={<CheckoutPage />} /> 
        <Route path="/checkout/confirm" element={<CheckoutConfirm />} />
        <Route path="/profile" element={<ProfilePage />} />        

        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="/inspectionPolicy" element={<InspectionPolicy />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/deliveryPolicy" element={<DeliveryPolicy />} />
        <Route path="/news" element={<NewsPage />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/order-details/:customerId" element={<OrderDetailsPage />} />

        <Route path="/filter" element={<ShopPage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />


        {/* Admin Routes */}
        <Route path="/admin-page" element={<UserManagement />} />
        <Route path="/admin-page/users" element={<UserManagement />} />
        <Route path="/admin-page/contents" element={<ContentPage />} />
        <Route path="/admin-page/settings" element={<UserManagement />} />

        {/* Manager Routes */}
        <Route path="/manager-page" element={<ProductManagement />} />
        <Route path="/manager-page/product" element={<ProductManagement />} />
        <Route path="/manager-page/add-product" element={<AddProduct />} />
      </Routes>

      <Chatbotbox />
    </div>

  );
}

export default App;
