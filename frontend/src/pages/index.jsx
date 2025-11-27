// Páginas públicas
export { default as LoginPage } from "./public/LoginPage";
export { default as HomePage } from "./public/HomePage";

// Páginas privadas
export { default as ProductsPage } from "./private/ProductsPage";
export { default as CartPage } from "./private/CartPage";

// Página privada (Solo Admin)
export { default as DashboardPage } from "./private/DashboardPage";

// Páginas de error
export { default as NotFoundPage } from "./errors/NotFoundPage";
export { default as UnauthorizedPage } from "./errors/UnauthorizedPage";