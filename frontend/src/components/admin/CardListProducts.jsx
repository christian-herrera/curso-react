import { showTextareaReadOnly, showImage } from "../../utils/utilsAlert";

// ---------------------------------------------------------------------
// --> Component: CardListProducts.jsx
// Listado de productos (admins)
// ---------------------------------------------------------------------
export default function CardListProducts({ productList = [], on_delProduct }) {
    // --> RENDERIZADO
    return (
        <div className="col-12 mv-4">
            <div className="card dashboard-card">
                <div className="card-body">
                    {/* Titulo */}
                    <h5 className="card-title mb-3">Listado Actual</h5>

                    {/* Tabla */}
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Subtitulo</th>
                                    <th className="text-center">Acciones</th>
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
                </div>
            </div>
        </div>
    );
}
