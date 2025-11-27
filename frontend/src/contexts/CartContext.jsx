import { createContext, useContext, useState } from "react";

// Creo el contexto del carrito de compras
const CartContext = createContext();

// Hook personalizado para usar el contexto. Se utiliza como:
// import { useCart } from '...../CartContext';
// const { add2cart } = useCart();
export const useCart = () => useContext(CartContext);

// -------------------------------------------------------
// --> Provider: CartProvider
// Provee el contexto del carrito de compras.
// -------------------------------------------------------
export default function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = sessionStorage.getItem("cart"); // Leo del sessionStorage
        return saved ? JSON.parse(saved) : []; // Si no hay nada, inicio con un array vacío
    });

    /**
     * ### CartContext - Agrega un producto al carrito
     * Toma el producto y lo agrega al carrito. Si el producto ya existe, aumenta su cantidad en 1.
     *
     * @param {Object} producto objeto que tiene los datos del producto a agregar, su estructura es:
     * - `id`: Identificador único del producto
     * - `title`: Titulo del producto
     * - `subtitle`: Subtitulo del producto
     * - `description`: Descripción del producto
     * - `price`: Precio del producto (en centavos)
     * - `quantity`: Cantidad del producto en el carrito
     * @returns {void}
     */
    function cartAdd(producto) {
        // Busco el primer elemento que tenga el mismo id que el producto a agregar
        const exist = cart.find((item) => item.id === producto.id); // -> devuelve el objeto

        let newCart = [];
        if (exist) {
            newCart = cart.map((item) => {
                // Por cada elemento del carrito...
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
            newCart = [...cart, { ...producto, quantity: 1 }];
        }

        // Actualizo el estado y el sessionStorage
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
    };


    /**
     * ### CartContext - Incrementa la cantidad de un producto en el carrito
     * Para un ID de un producto dado, incrementa su cantidad en 1.
     * 
     * @param {number} productoId ID del producto a incrementar
     * @returns {void}
     */
    function cartInc(productoId) {
        // Recorro todos los productos...
        const newCart = cart.map((item) => {
            if (item.id === productoId) {
                // Donde coincide el ID...
                return { ...item, quantity: item.quantity + 1 }; // Aumento la cantidad en 1
            }
            return item;
        });

        // Actualizo el estado y el sessionStorage
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
    };



    /**
     * ### CartContext - Decrementa la cantidad de un producto en el carrito
     * Para un ID de un producto dado, decrementa su cantidad en 1.
     * Si la cantidad llega a 0, elimina el producto del carrito.
     * 
     * @param {number} productoId ID del producto a decrementar
     * @returns {void}
     */
    function cartDec(productoId) {
        // Recorro todos los productos...
        const newCart = cart
            .map((item) => {
                if (item.id === productoId) {
                    // Donde coincide el ID...
                    return { ...item, quantity: item.quantity - 1 }; // Disminuyo la cantidad en 1
                }
                return item;
            })
            .filter((item) => item.quantity > -1); // Si la cantidad es < -1, lo elimino del carrito filtrando todos los productos

        // Actualizo el estado y el sessionStorage
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
    };


    /**
     * ### CartContext - Elimina un producto del carrito
     * Para un ID de un producto dado, lo elimina completamente del carrito.
     * 
     * @param {number} productoId ID del producto a eliminar
     * @returns {void}
     */
    function cartRemove(productoId) {
        // Recorro todos los productos...
        const newCart = cart.filter((item) => item.id !== productoId); // Elimino el producto cuyo ID coincide

        // Actualizo el estado y el sessionStorage
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
    };


    /**
     * ### CartContext - Limpia el carrito
     * Elimina todos los productos del carrito.
     * 
     * @param {void}
     * @returns {void}
     */
    function cartClear() {
        // Elimino todos los productos del carrito
        setCart([]);
        sessionStorage.removeItem("newCart");
    };


    // --> Render del proveedor del contexto
    return (
        <CartContext.Provider
            value={{
                cart,
                cartAdd,
                cartInc,
                cartDec,
                cartRemove,
                cartClear,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
