
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes y Contextos
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Páginas
import Login from "../pages/public/Login";
import Home from "../pages/public/Home";
import Dashboard from "../pages/private/Dashboard";
import Carrito from "../pages/private/Carrito";

// Errores
import Error404 from "../pages/errors/Error404";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>

        {/* 404 - Ruta desconocida */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;