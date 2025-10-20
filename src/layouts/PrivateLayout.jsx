import { Outlet, Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';

// Contextos
import { AuthContext } from '../contexts/AuthContext';
import { CarritoContext } from '../contexts/CarritoContext';


// Imagenes
import logo_icon from '../assets/logo_reduced.svg';


/**
 * --------------------------------------------------------------
 * ==> PrivateLayout.jsx - Diseño del Layout Privado
 * --------------------------------------------------------------
 */
export default function PrivateLayout() {
    const { isAuth, user, logout } = useContext(AuthContext);
    const { carrito } = useContext(CarritoContext);

    const handleLogout = () => {
        if (confirm("¿Estás seguro de cerrar sesión?")) {
            logout();
            return <Navigate to="/login" />;
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
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-2">
                                <li className="nav-item">
                                    <Link to="/carrito" className="btn btn-outline-primary ms-auto mx-2 w-100">
                                        Carrito ({carrito.length})
                                    </Link>
                                </li>
                            </ul>

                            {/* Ver productos */}
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-2">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="btn btn-outline-primary ms-auto mx-2 w-100">
                                        Ver Productos
                                    </Link>
                                </li>
                            </ul>

                            {/* Cerrar sesión */}
                            <ul className="navbar-nav mb-2 mb-lg-0 me-lg-3">
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
        return <Navigate to="/login" />;
    }
}
