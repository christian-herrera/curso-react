import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


// Contextos
import { CarritoContext } from '../../contexts/CarritoContext';


// Imagenes
import leftIcon from '../../assets/icons/left.svg';
import rightIcon from '../../assets/icons/right.svg';
import trashIcon from '../../assets/icons/trash.svg';


/**
 * ------------------------------------------------------------
 * ==> Carrito.jsx - Página del Carrito de Compras
 * ------------------------------------------------------------
 */
export default function CarritoPagePage() {
    const navigate = useNavigate();

    // Contexto del Carrito
    const { carrito, vaciarCarrito, sumarProducto, restarProducto, quitarProducto } = useContext(CarritoContext);


    // Consulta sobre vaciar carrito
    const handleVaciarCarrito = () => {
        if (confirm("¿Estás seguro de vaciar el carrito?")) {
            vaciarCarrito();
        }
    };


    return (
        <>
            {/* Contenido Principal: Listado de productos */}
            <div className="container pt-4">

                <h2 className="pb-2">Listado de Productos</h2>

                <div className="container mb-4">
                    <div className="row">
                        <div className="ms-auto col-12 mb-2 col-md-3 mb-md-0">
                            <button className="btn btn-primary w-100 me-2" onClick={() => navigate('/dashboard')}>Volver</button>
                        </div>
                        <div className="me-auto col-12 col-md-3">
                            <button className="btn btn-danger w-100" onClick={handleVaciarCarrito}>Vaciar Carrito</button>
                        </div>
                    </div>
                </div>

                {/* Tabla de productos en el carrito */}
                <div className='table-responsive'>
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col" className='text-center'>Precio</th>
                                <th scope="col" className='text-center'>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Carrito Vacio */}
                            {carrito.length === 0 && (
                                <tr>
                                    <td colSpan="3" className='text-center fs-5 fst-italic py-3'>- El carrito se encuentra vacío -</td>
                                </tr>
                            )}


                            {carrito.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>

                                    <td className='text-center'>$ {item.price.toFixed(2)}</td>

                                    <td >
                                        <div className='d-flex justify-content-center align-items-center gap-2'>
                                            <img src={leftIcon} alt="Restar" style={{ cursor: "pointer" }} onClick={() => restarProducto(item.id)} />
                                            <input className='form-control text-center' style={{ width: "50px" }} value={item.quantity} readOnly />
                                            <img src={rightIcon} alt="Sumar" style={{ cursor: "pointer" }} onClick={() => sumarProducto(item.id)} />
                                            <img src={trashIcon} alt="Eliminar" style={{ cursor: "pointer" }} onClick={() => quitarProducto(item.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td><strong>Total</strong></td>
                                <td className='text-center fs-5' colSpan="3">$ {carrito.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
