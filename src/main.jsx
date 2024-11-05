import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
//import AppRouter from './components/appRouters/AppRouter'; // Ruta correcta a AppRouter
import App from './App2'
import './styles.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
