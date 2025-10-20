import { useState } from "react";



/**
 * --------------------------------------------------------------
 * ==> CardProducto.jsx - Componente de tarjeta de producto
 * --------------------------------------------------------------
 */
export default function CardProducto({ producto, onAgregar_fn, cantEnCarrito = 0 }) {
    const [imgLoading, setImgLoading] = useState(true);

    return (
        <div key={producto.id} className="col-12 col-md-4">
            <div className="card mb-4">

                {/* Spinner de Carga para la imagen */}
                {imgLoading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando imagen...</span>
                        </div>
                    </div>
                )}


                {/* Imagen */}
                <img
                    src={producto.image}
                    className="card-img-top"
                    onLoad={() => setImgLoading(false)}
                    style={{
                        height: "200px",
                        objectFit: "cover",
                        display: imgLoading ? "none" : "block"
                    }}
                    alt="Error..." />

                {/* Titulo, descripción y precio */}
                <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
                    <p className="card-text">{producto.description}</p>
                    <p className="card-text fs-4 d-flex align-items-center gap-2">
                        ${producto.price.toFixed(2)}
                        {cantEnCarrito > 0 && (
                            <span className="badge text-bg-success">{cantEnCarrito}</span>
                        )}
                    </p>

                    <button className="btn btn-primary w-100" onClick={() => onAgregar_fn(producto)}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
}