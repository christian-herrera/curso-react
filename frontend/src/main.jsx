import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import AppRouter from './routes/AppRouter';
import AuthProvider from './contexts/AuthContext';
import CarritoProvider from './contexts/CarritoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>,
)



// NOTA:
// <StrictMode> es un componente solo de desarrollo que no afecta la app en producción.
// El proposito es ayudar al desarrollador a encontrar problemas y malas practicas en React antes de que lleguen a produccion.
// Por ejemplo: 
// - Chequeos de renderizado duplicado.
// - Detecta usos de APIs obsoletas.
// - Chequea efectos secundarios en Hooks.
// - Detecta claves duplicadas en listas (key en map).
// - Chequea componentes con mutaciones inseguras.