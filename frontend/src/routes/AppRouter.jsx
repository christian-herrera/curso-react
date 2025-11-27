import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Protecciones
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

// Páginas públicas
const LoginPage = lazy(() => import("../pages/public/LoginPage"));
const HomePage = lazy(() => import("../pages/public/HomePage"));

// Páginas privadas
const ProductsPage = lazy(() => import("../pages/private/ProductsPage"));
const CartPage = lazy(() => import("../pages/private/CartPage"));

// Página privada (Solo Admin)
const DashboardPage = lazy(() => import("../pages/private/DashboardPage"));

// Páginas de error
const NotFoundPage = lazy(() => import("../pages/errors/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("../pages/errors/UnauthorizedPage"));

// --------------------------------------------------------------
// ==> AppRouter.jsx - Configuración de Rutas
// --------------------------------------------------------------
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Rutas Privadas */}
                <Route
                    element={
                        <UserRoute>
                            <PrivateLayout />
                        </UserRoute>
                    }
                >
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />

                    {/* Rutas Privadas (Solo Admins) */}
                    <Route
                        path="/dashboard"
                        element={
                            <AdminRoute>
                                <DashboardPage />
                            </AdminRoute>
                        }
                    />
                </Route>

                {/* 404 - Ruta desconocida */}
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/401" element={<UnauthorizedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
