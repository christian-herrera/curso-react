import { Outlet, Link, useNavigate } from "react-router-dom";

// Contextos
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

// Utils
import { showQuestion } from "../utils/utilsAlert";

// Imagenes
import logo_icon from "../assets/logo_reduced.svg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";

// JS de Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";



// -------------------------------------------------------------
// --> Layout: PrivateLayout.jsx - Diseño del Layout Privado
// -------------------------------------------------------------
export default function PrivateLayout() {
    const navigate = useNavigate();
    const { nombre, apellido, is_admin, logout } = useAuth();
    const { cart } = useCart();

    // --> Handle: Cerrar sesión
    const handleLogout = async () => {
        const resp = await showQuestion("¿Cerrar sesión?", "Se cerrará la sesión actual", "warning");
        if (resp.isConfirmed) {
            logout();
        }
    };


    // --> Handle: Enviar formulario de búsqueda
    const handleSearchForm = (e) => {
        e.preventDefault();
        const query = e.target.search.value
        navigate(`/search?query=${encodeURIComponent(query)}`);
    }



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
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <b>Usuario:</b>{" "}
                                <i>
                                    {nombre} {apellido}
                                </i>
                            </li>
                        </ul>

                        {/* Buscador */}
                        <form className="d-flex px-2 mb-2 mb-lg-0" role="search" onSubmit={handleSearchForm}>
                            <input
                                name="search"
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar productos..."
                                aria-label="Buscar"
                                required
                            />
                            <button className="btn btn-outline-primary" type="submit">
                                <SearchIcon />
                                <span className="visually-hidden">Buscar</span>
                            </button>
                        </form>

                        {/* Actualizar listado */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-2 px-2">
                            <li className="nav-item">
                                <Link to="/cart" className="btn btn-outline-primary position-relative ms-auto w-100">
                                    <ShoppingCartIcon />
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
