import { showTextareaReadOnly, showImage } from "../../utils/utilsAlert";

// ---------------------------------------------------------------------
// --> Component: TableOfProducts.jsx
// Listado de productos (admins)
// ---------------------------------------------------------------------
export default function TableOfProducts({ productList = [], on_delProduct }) {
    // --> RENDERIZADO
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle table-bordered text-center">
                <thead>
                    <tr>
                        <th className="w-50">Titulo</th>
                        <th className="w-25">Subtitulo</th>
                        <th className="w-25 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Listado */}
                    {productList && productList.length > 0 ? (
                        productList.map((file) => (
                            <tr key={file.id}>
                                <td>{file.title}</td>
                                <td>{file.subtitle}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-info mx-1" title="Ver Descripción" onClick={() => showTextareaReadOnly("Descripción:", file.description)}>
                                        📄
                                    </button>
                                    <button className="btn btn-sm btn-info mx-1" title="Ver Imagen" onClick={() => showImage("Vista Previa", file.image)}>
                                        🖼️
                                    </button>
                                    <button className="btn btn-sm btn-danger mx-1" title="Eliminar" onClick={() => on_delProduct(file.id)}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay archivos cargados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
