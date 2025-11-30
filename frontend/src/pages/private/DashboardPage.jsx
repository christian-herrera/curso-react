import { useState, useEffect } from "react";

// Hooks
import useProductList from "../../hooks/useProductList";

// Componentes
import CardProductAdd from "../../components/admin/CardProductAdd";
import TableOfProducts from "../../components/admin/TableOfProducts";
import Paginator from "../../components/Paginator";

// Utils
import { showQuestion, showToast } from "../../utils/utilsAlert";

// Styles
import "../../styles/dashboard.css";

// --------------------------------------------------------------
// ==> Dashboard.jsx - Página del panel de control
// --------------------------------------------------------------
export default function DashboardPage() {
    const { getProductList, delProduct, addProduct } = useProductList();
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // --> Utilidad: Obtener la lista de productos
    async function get(page = currentPage) {
        const resp = await getProductList(page);
        if (resp.success) {
            setProductList(resp.data.products);
            setTotalPages(resp.data.total_pages);
            setCurrentPage(page);
        } else if (!resp.unauthorized) {
            showToast("Error al obtener los datos!", "error");
        }
    }

    // --> Hook: Obtener la lista de productos al cargar la página
    useEffect(() => {
        get(1);
    }, []);

    // --> Handle: Submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addProduct(
            e.target.title.value,
            e.target.subtitle.value,
            e.target.description.value,
            parseInt(e.target.price.value * 100), // Convertir a centavos
            e.target.image.files[0]
        );
        if (result.success) {
            showToast("Producto agregado correctamente", "success");
            e.target.reset();
            get();
        } else if (!result.unauthorized) {
            showToast("Error al agregar el producto", "error");
        }
    };

    // --> Handle: Eliminar producto
    const handleDelProduct = async (productId) => {
        const confirmDelete = await showQuestion("Seguro?", "Esta acción no se puede deshacer.");
        if (!confirmDelete.isConfirmed) return;

        const resp = await delProduct(productId);
        if (resp.success) {
            showToast("Producto eliminado correctamente", "success");
            get();
        } else {
            showToast("Error al eliminar el producto", "error");
        }
    };

    // --> RENDERIZADO
    return (
        <>
            {/* Contenido Principal: Listado de productos */}
            <div className="container pt-4">
                <h2 className="pb-2">Panel de Administración</h2>

                <div className="row">
                    {/* Listado de archivos */}
                    <div className="col-12 mb-4">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                {/* Titulo */}
                                <h3 className="card-title mb-3 fs-4">Listado Actual</h3>

                                {/* Tabla */}
                                <TableOfProducts productList={productList} on_delProduct={handleDelProduct} />
                                <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={(newPage) => get(newPage)} />
                            </div>
                        </div>
                    </div>

                    {/* Form para agregar producto */}
                    <CardProductAdd on_submit={handleSubmit} />
                </div>
            </div>
        </>
    );
}
