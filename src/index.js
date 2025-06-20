import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Thêm dòng này
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthCartProvider } from './context/AuthCartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthCartProvider>
        <App />
      </AuthCartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
