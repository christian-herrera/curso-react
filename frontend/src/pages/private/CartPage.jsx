import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Contextos
import { useCart } from "../../contexts/CartContext";

// Utils
import { showNotify, showQuestion } from "../../utils/utilsAlert";

// Imagenes
import leftIcon from "../../assets/icons/left.svg";
import rightIcon from "../../assets/icons/right.svg";
import trashIcon from "../../assets/icons/trash.svg";

/**
 * ------------------------------------------------------------
 * ==> Carrito.jsx - Página del Carrito de Compras
 * ------------------------------------------------------------
 */
export default function CarritoPagePage() {
    const navigate = useNavigate();
    const { cart, cartInc, cartDec, cartRemove, cartClear } = useCart();

    // --> Handle: Vaciar carrito
    const handleVaciarCarrito = async () => {
        const resp = await showQuestion("Está seguro?", "Desea vaciar el carrito de compras?");
        if (resp.isConfirmed) {
            cartClear();
            showNotify("Carrito limpio!", "El carrito de compras ha sido vaciado correctamente.", "success");
        }
    };

    // --> Handle: Realizar compra
    const handlePay = async () => {
        const resp = await showQuestion("Está seguro?", "Desea proceder con la compra de los productos en el carrito?");
        if (resp.isConfirmed) {
            setTimeout(() => {
                showNotify("Pago exitoso!", `Se há realizado la compra por el total de ${cart.length} productos!`, "success");
            }, 500);
        }
    };

    // --> RENDERIZADO
    return (
        <>
            {/* Contenido Principal: Listado de productos */}
            <div className="container pt-4">
                <h2 className="pb-2">Listado de Productos</h2>

                <div className="container mb-4">
                    <div className="row">
                        <div className="ms-auto col-12 mb-2 col-md-3 mb-md-0">
                            <button className="btn btn-primary w-100 me-2" onClick={() => navigate("/products")}>
                                Volver
                            </button>
                        </div>
                        <div className="me-auto col-12 col-md-3">
                            <button className="btn btn-danger w-100" onClick={handleVaciarCarrito} disabled={cart.length === 0}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla de productos en el carrito */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col" className="text-center">
                                    Precio
                                </th>
                                <th scope="col" className="text-center">
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Carrito Vacío */}
                            {cart.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center fs-5 fst-italic py-3">
                                        - El carrito se encuentra vacío -
                                    </td>
                                </tr>
                            )}

                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td scope="row">{item.title}</td>

                                    <td className="text-center">$ {(item.price / 100).toFixed(2)}</td>

                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            {/* Botón de Decremento */}
                                            <button className="btn p-0 border-0 bg-transparent" onClick={() => cartDec(item.id)} aria-label={`Restar uno a ${item.title}`}>
                                                <img src={leftIcon} alt="" />
                                            </button>
                                            <label htmlFor={`quantity-${item.id}`} className="visually-hidden">
                                                Cantidad de {item.title}
                                            </label>

                                            {/* Cantidad del producto en cuestión */}
                                            <input id={`quantity-${item.id}`} className="form-control text-center" style={{ width: "50px" }} value={item.quantity} readOnly />

                                            {/* Botón de Incremento */}
                                            <button className="btn p-0 border-0 bg-transparent" onClick={() => cartInc(item.id)} aria-label={`Sumar uno a ${item.title}`}>
                                                <img src={rightIcon} alt="" />
                                            </button>

                                            {/* Botón de eliminar item */}
                                            <button className="btn p-0 border-0 bg-transparent" onClick={() => cartRemove(item.id)} aria-label={`Eliminar ${item.title} del carrito`}>
                                                <img src={trashIcon} alt="" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td className="text-center fs-5" colSpan="3">
                                    $ {cart.reduce((sum, item) => sum + (item.price / 100) * item.quantity, 0).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="container row mt-4 mx-0">
                    <div className="col-md-8 col-12 mx-auto">
                        <button className="btn btn-warning w-100 fs-5 fw-bold" style={{ height: "2.5em" }} onClick={handlePay}>
                            Realizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
