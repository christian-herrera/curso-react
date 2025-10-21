import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Contextos
import { useAuth } from '../contexts/AuthContext';
import { CarritoContext } from '../contexts/CarritoContext';


// Imagenes
import logo_icon from '../assets/logo_reduced.svg';
import cartIcon from '../assets/icons/cart.svg';


/**
 * --------------------------------------------------------------
 * ==> PrivateLayout.jsx - Diseño del Layout Privado
 * --------------------------------------------------------------
 */
export default function PrivateLayout() {
    const { isAuth, user, logout } = useAuth();
    const { carrito } = useContext(CarritoContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm("¿Estás seguro de cerrar sesión?")) {
            logout();
            navigate('/login', { replace: true });
        }
    };

    if (isAuth) {
        {/* Navbar */ }
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        {/* Logo */}
                        <a className="navbar-brand" href="#">
                            <img src={logo_icon} alt="Logo" style={{ height: "40px" }} />
                        </a>

                        {/* Botón de menú */}
                        <button className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Menú colapsable */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Información del usuario */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <b>Rol:</b> <i>{user.role}</i>
                                </li>
                            </ul>


                            {/* Actualizar listado */}
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-2 px-2">
                                <li className="nav-item">
                                    <Link to="/carrito" className="btn btn-outline-primary position-relative ms-auto w-100">
                                        <img src={cartIcon} alt="Carrito" style={{ height: "20px" }} />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {carrito.length}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>

                            {/* Ver productos */}
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-2 px-2">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="btn btn-outline-primary w-100">
                                        Ver Productos
                                    </Link>
                                </li>
                            </ul>

                            {/* Cerrar sesión */}
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-3 px-2">
                                <li className="nav-item">
                                    <button className="btn btn-outline-primary w-100" type="button" onClick={handleLogout}>Cerrar Sesión</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Outlet />
            </>
        );
    } else {
        {/* Retorna al login */ }
        return <Navigate to="/login" replace />;
    }
}
