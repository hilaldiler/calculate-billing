import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BillingProvider } from './components/BillingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BillingProvider>
          <App />
      </BillingProvider>
  </React.StrictMode>
);
