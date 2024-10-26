import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>  {/*Wrapped the whole code to use contexApi to prevent from propdrilling lake ham parent se child ko data send krr rhe hai*/}
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </AuthProvider>
);

// Optionally enable performance monitoring
// reportWebVitals(console.log);
