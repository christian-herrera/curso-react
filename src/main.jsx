import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AppRouter from './routes/AppRouter';
import AuthProvider from './contexts/AuthContext';
import CarritoProvider from './contexts/CarritoContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  // </StrictMode>,
)
