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
import { ProductDetails } from './pages/ProductDetails/ProductDetails';

import OrderHistoryPage from './pages/order/OrderHistoryPage';
import OrderDetailsPage from './pages/order/OrderDetailsPage';
import ProfilePage from './pages/profile/ProfilePage';


function App() {
  return (
    <>
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

        <Route path="/product/1" element={<ProductDetails />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/order-details/" element={<OrderDetailsPage />} />

      </Routes>

      <Chatbotbox />
    </>
  );
}

export default App;
