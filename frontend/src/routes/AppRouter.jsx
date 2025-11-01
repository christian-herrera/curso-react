
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Protecciones
import ProtectedRoute from "./ProtectedRoute";

// Paginas (todas)
import * as Pages from "../pages";


// --------------------------------------------------------------
// ==> AppRouter.jsx - Configuración de Rutas
// --------------------------------------------------------------
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/login" element={<Pages.LoginPage />} />
        </Route>

        {/* Rutas Privadas */}
        <Route element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }>

          <Route path="/dashboard" element={<Pages.DashboardPage />} />
          <Route path="/carrito" element={<Pages.CarritoPage />} />
        </Route>



        {/* 404 - Ruta desconocida */}
        <Route path="*" element={<Pages.NotFoundPage />} />
        <Route path="/401" element={<Pages.UnauthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;