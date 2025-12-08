import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";  // No es necesario para este proyecto
import "./styles/global.css";


// --->> Carga perezosa (lazy loading) de AppRouter <<---
// import AppRouter from "./routes/AppRouter";
const AppRouter = lazy(() => import("./routes/AppRouter"));

import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <AppRouter />
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);

// NOTA:
// <StrictMode> es un componente solo de desarrollo que no afecta la app en producción.
// El proposito es ayudar al desarrollador a encontrar problemas y malas practicas en React antes de que lleguen a produccion.
// Por ejemplo:
// - Chequeos de renderizado duplicado.
// - Detecta usos de APIs obsoletas.
// - Chequea efectos secundarios en Hooks.
// - Detecta claves duplicadas en listas (key en map).
// - Chequea componentes con mutaciones inseguras.
