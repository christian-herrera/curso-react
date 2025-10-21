import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import CardProducto from '../../components/CardProducto';

// Contextos
import { CarritoContext } from '../../contexts/CarritoContext';


/**
 * --------------------------------------------------------------
 * ==> Dashboard.jsx - Página del panel de control
 * --------------------------------------------------------------
 */
export default function DashboardPage() {
    


    // Contexto del Carrito
    const { carrito, agregarAlCarrito } = useContext(CarritoContext);
    
    // Adm. del listado de productos
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/productos/productos.json")
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
