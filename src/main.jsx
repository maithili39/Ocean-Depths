import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { OceanProvider } from './context/OceanContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OceanProvider>
      <App />
    </OceanProvider>
  </React.StrictMode>
);
