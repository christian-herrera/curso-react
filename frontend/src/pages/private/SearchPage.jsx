import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Componentes
import CardProducto from "../../components/CardProducto";

// Contextos
import { useCart } from "../../contexts/CartContext";

// Hooks
import useProductList from "../../hooks/useProductList";
import { showToast } from "../../utils/utilsAlert";

/**
 * --------------------------------------------------------------
 * ==> Dashboard.jsx - Página del panel de control
 * --------------------------------------------------------------
 */
export default function SearchPage() {
    const [params] = useSearchParams();
    const query = params.get("query");

    const { cart, cartAdd } = useCart();
    const { getProductsWithQuery } = useProductList();

    const [prodList, setProdList] = useState([]);
    const [loading, setLoading] = useState(true);

    // --> Utilidad: Realiza la busqueda de productos
    async function get() {
        const resp = await getProductsWithQuery(query);
        if (resp.success) {
            setProdList(resp.data);
            setLoading(false);
        } else if (!resp.unauthorized) {
            showToast("Error al obtener los datos!", "error");
        }
    }

    // --> Hook: Solicito al backend los productos al montar el componente
    useEffect(() => {
        if(query) get();
    }, [query]);

    // --> RENDERIZADO
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
                        {/* Lista los productos encontrados */}
                        {prodList.length > 0 &&
                            prodList.map((p) => <CardProducto producto={p} onAgregar_fn={cartAdd} key={p.id} cantEnCarrito={cart.filter((item) => item.id === p.id)[0]?.quantity} />)}

                        {/* Mensaje cuando no hay resultados */}
                        {prodList.length === 0 && (
                            <div className="alert alert-info text-center rounded-4" role="alert">
                                No se encontraron productos que coincidan con la búsqueda "{query}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
