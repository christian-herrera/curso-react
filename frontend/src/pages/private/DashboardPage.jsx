import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import CardProducto from '../../components/CardProducto';

// Contextos
import { useAuth } from '../../contexts/AuthContext';
import { useCarrito } from '../../contexts/CarritoContext';


// Servicios
import { getProductos } from '../../services/apiProductos';


/**
 * --------------------------------------------------------------
 * ==> Dashboard.jsx - Página del panel de control
 * --------------------------------------------------------------
 */
export default function DashboardPage() {
    const Navigate = useNavigate();

    // Contexto del Usuario
    const { userToken, logout } = useAuth();

    // Contexto del Carrito
    const { carrito, agregarAlCarrito } = useCarrito();

    // Adm. del listado de productos
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==> Cargo el listado de productos al montar el componente
    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            try {
                const resp = await getProductos(userToken);

                if(resp.result != true){
                    alert("Sesión expirada. Por favor, inicie sesión de nuevo.");
                    logout();
                    Navigate('/login');
                    return;
                }

                setProductos(resp.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userToken]);


    return (
        <>
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
                            <CardProducto producto={p} onAgregar_fn={agregarAlCarrito} key={p.id} cantEnCarrito={carrito.filter(item => item.id === p.id)[0]?.quantity} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
