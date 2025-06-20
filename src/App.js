import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShopPage from './pages/shop/ShopPage';
import { Navigate } from 'react-router-dom';

// 👉 thêm dòng này:
import FloatingContact from './components/FloatingContact';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>

      {/* 👉 nút chat nổi xuất hiện trên mọi trang */}
      <FloatingContact />
    </>
  );
}

export default App;
