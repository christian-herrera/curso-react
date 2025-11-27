import { useState, useEffect } from 'react';

// Componentes
import CardProducto from '../../components/CardProducto';

// Contextos
import { useCart } from '../../contexts/CartContext';

// Hooks
import useProductList from '../../hooks/useProductList';
import { showToast } from '../../utils/utilsAlert';


/**
 * --------------------------------------------------------------
 * ==> Dashboard.jsx - Página del panel de control
 * --------------------------------------------------------------
 */
export default function ProductsPage() {
    const { cart, cartAdd } = useCart();
    const { getProductList } = useProductList();

    const [prodList, setProdList] = useState([]);
    const [loading, setLoading] = useState(true);

    // --> Hook: Solicito al backend los productos al montar el componente
    useEffect(() => {
        async function get() {
            const resp = await getProductList();
            if(resp.success){
                setProdList(resp.products);
                setLoading(false);
            } else if(!resp.unauthorized) {
                showToast('Error al obtener los datos!', 'error');
            }
        }
        get();
    }, []);


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
                        {prodList.map((p) => (
                            <CardProducto producto={p} onAgregar_fn={cartAdd} key={p.id} cantEnCarrito={cart.filter(item => item.id === p.id)[0]?.quantity} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
