import { createContext, useState } from "react";


// Creo el contexto del carrito de compras
export const CarritoContext = createContext();


/**
 * ------------------------------------------------------------
 * ==> Proveedor del contexto del carrito de compras
 * ------------------------------------------------------------
 */
export default function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const saved = sessionStorage.getItem("carrito"); // Leo del sessionStorage
        return saved ? JSON.parse(saved) : [];           // Si no hay nada, inicio con un array vacío
    });

    const agregarAlCarrito = (producto) => {
        // Busco el primer elemento que tenga el mismo id que el producto a agregar
        const exist = carrito.find(item => item.id === producto.id);

        let nuevoCarrito = [];
        if (exist) {
            nuevoCarrito = carrito.map(item => { // Por cada elemento del carrito...
                if (item.id === producto.id) {
                    // El original era: { id: ..., name: ..., price: ..., quantity: prev}
                    // El nuevo será:   { id: ..., name: ..., price: ..., quantity: prev+1}
                    return { ...item, quantity: item.quantity + 1 }; 
                }
                return item; // Los demás productos quedan igual
            });
        } else {
            // El objeto original: { id: ..., name: ..., price: ... }
            // El objeto nuevo:    { id: ..., name: ..., price: ..., quantity: 1 }    <- Agrega `quantity`
            nuevoCarrito = [...carrito, { ...producto, quantity: 1 }];
        }

        // Actualizo el estado y el sessionStorage
        setCarrito(nuevoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }


    const sumarProducto = (productoId) => {
        // Recorro todos los productos...
        const nuevoCarrito = carrito.map(item => {
            if(item.id === productoId) { // Donde coincide el ID...
                return { ...item, quantity:  item.quantity + 1 }; // Aumento la cantidad en 1
            }
            return item;
        });

        // Actualizo el estado y el sessionStorage
        setCarrito(nuevoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }


    const restarProducto = (productoId) => {
        // Recorro todos los productos...
        const nuevoCarrito = carrito.map(item => {
            if(item.id === productoId) { // Donde coincide el ID...
                return { ...item, quantity:  item.quantity - 1 }; // Disminuyo la cantidad en 1
            }
            return item;
        })
        .filter(item => item.quantity > -1); // Si la cantidad es < -1, lo elimino del carrito filtrando todos los productos

        // Actualizo el estado y el sessionStorage
        setCarrito(nuevoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }


    const quitarProducto = (productoId) => {
        // Recorro todos los productos...
        const nuevoCarrito = carrito.filter(item => item.id !== productoId); // Elimino el producto cuyo ID coincide

        // Actualizo el estado y el sessionStorage
        setCarrito(nuevoCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }


    const vaciarCarrito = () => {
        // Elimino todos los productos del carrito
        setCarrito([]);
        sessionStorage.removeItem("carrito");
    };


    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, sumarProducto, restarProducto, quitarProducto }}>
            {children}
        </CarritoContext.Provider>
    );
}