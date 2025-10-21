
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";


// Errores
import * as Pages from "../pages";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/login" element={<Pages.LoginPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Pages.DashboardPage />} />
          <Route path="/carrito" element={<Pages.CarritoPage />} />
        </Route>

        {/* 404 - Ruta desconocida */}
        <Route path="*" element={<Pages.NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;