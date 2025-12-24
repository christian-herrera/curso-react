// ---------------------------------------------------------------------------
// --> Component: CardProductAdd.jsx
// Formulario para agregar producto (admins)
// ---------------------------------------------------------------------------
export default function CardProductAdd({ on_submit }) {
    // --> Handle: Formato de precio
    const handleFormatPrice = (e) => {
        const value = parseFloat(e.target.value || 0).toFixed(2);
        e.target.value = value < 0 ? "0.00" : value;
    };


    // --> RENDERIZADO
    return (
        <div className="col-12 mb-4">
            <div className="card dashboard-card">
                <div className="card-body">
                    {/* Titulo */}
                    <h3 className="card-title mb-3 fs-4">Agregar Producto <span className="badge bg-warning">Deshabilitado</span></h3>

                    {/* Form para el Upload */}
                    <form onSubmit={on_submit} className="container-fluid row px-0 mx-0">
                        {/* Titulo */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="title">Titulo</label>
                            <input type="text" name="title" id="title" className="form-control mb-3" required />
                        </div>

                        {/* Precio */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="price">Precio</label>
                            <input type="number" name="price" id="price" className="form-control mb-3" step="0.01" min="0" onBlur={handleFormatPrice} required />
                        </div>

                        {/* Subtitulo */}
                        <div className="col-12">
                            <label className="form-label" htmlFor="subtitle">Subtitulo</label>
                            <input type="text" name="subtitle" id="subtitle" className="form-control mb-3" required />
                        </div>

                        {/* Descripción */}
                        <div className="col-12">
                            <label className="form-label" htmlFor="description">Descripción</label>
                            <textarea name="description" id="description" className="form-control mb-3" rows={4} required />
                        </div>

                        {/* Foto */}
                        <div className="col-12">
                            <label className="form-label" htmlFor="image">Seleccione una foto</label>
                            <input type="file" name="image" id="image" className="form-control" required />
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100 mt-3">
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
