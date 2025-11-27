import { Outlet, Navigate, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Contextos
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

// Utils
import { showQuestion } from "../utils/utilsAlert";

// Imagenes
import logo_icon from "../assets/logo_reduced.svg";
import cartIcon from "../assets/icons/cart.svg";


// -------------------------------------------------------------
// --> Layout: PrivateLayout.jsx - Diseño del Layout Privado
// -------------------------------------------------------------
export default function PrivateLayout() {
    const { nombre, apellido, is_admin, logout } = useAuth();
    const { cart } = useCart();

    // --> Handle: Cerrar sesión
    const handleLogout = async () => {
        const resp = await showQuestion("¿Cerrar sesión?", "Se cerrará la sesión actual", "warning");
        if (resp.isConfirmed) {
            logout();
        }
    };

    // --> RENDERIZADO
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand" href="#">
                        <img src={logo_icon} alt="Logo" style={{ height: "40px" }} />
                    </a>

                    {/* Botón de menú */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menú colapsable */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Información del usuario */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <b>Usuario:</b>{" "}
                                <i>
                                    {nombre} {apellido}
                                </i>
                            </li>
                        </ul>

                        {/* Actualizar listado */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-2 px-2">
                            <li className="nav-item">
                                <Link to="/cart" className="btn btn-outline-primary position-relative ms-auto w-100">
                                    <img src={cartIcon} alt="Carrito" style={{ height: "20px" }} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cart.length}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>

                        {/* Ver productos */}
                        <ul className="navbar-nav mb-2 mb-lg-0 me-lg-2 px-2">
                            <li className="nav-item">
                                <Link to="/products" className="btn btn-outline-primary w-100">
                                    Ver Productos
                                </Link>
                            </li>
                        </ul>

                        {/* Dashboard (Solo admins) */}
                        {is_admin && (
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-2 px-2">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="btn btn-outline-primary w-100">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {/* Cerrar sesión */}
                        <ul className="navbar-nav mb-2 mb-lg-0 me-lg-3 px-2">
                            <li className="nav-item">
                                <button className="btn btn-outline-primary w-100" type="button" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}
