import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import CardProducto from "../components/CardProducto";

// Contextos
import { AuthContext } from "../contexts/AuthContext";

// Imagenes
import logo_icon from "../assets/logo_reduced.svg";



export default function Dashboard() {
    const navigate = useNavigate();

    // Context de Autenticación
    const { userData, logout } = useContext(AuthContext);
    const handleLogout = () => {
        if (confirm("¿Estás seguro de cerrar sesión?")) {
            logout();
            navigate("/");
        }
    };

    // Adm. del listado de productos
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);


    // Fetch de productos
    useEffect(() => {
        if(!userData) return; //Evita fetch si no hay usuario
        
        setLoading(true);
        fetch("./productos/productos.json")
            .then((res) => {
                if (!res.ok) throw new Error("Error en la conexion a la API...");
                return res.json();
            })
            .then((data) => setProductos(data))
            .catch((err) => alert(err.message))
            .finally(() => setLoading(false));
    }, []);


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
                                <b>Usuario:</b> <i>{userData ? userData.nombre : "Invitado"}</i>
                            </li>
                        </ul>
                        {/* Actualizar listado */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-lg-2">
                            <li className="nav-item">
                                <button className="btn btn-outline-primary ms-auto mx-2 w-100" type="button">Carrito</button>
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

            {/* Contenido Principal: Listado de productos */}
            <div className="container pt-4">
                <h2 className="pb-2">Listado de Productos</h2>


                {/* Spinner de Carga General */}
                {loading && (
                    <div className="text-center">
                        <h2 className="my-5">Consultando productos...</h2>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Consultando productos...</span>
                        </div>
                    </div>
                )}

                {/* JSON obtenido, muestra las cards */}
                {!loading && (
                    <div className="row">
                        {productos.map((p) => (
                            <CardProducto producto={p} key={p.id} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}