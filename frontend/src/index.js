// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 için createRoot kullan
import './index.css'; // Bootstrap ve özel stilleri içe aktar
import App from './App'; // Ana App bileşenini içe aktar

// React uygulamasını DOM'a render et
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
