import axios from "axios";

import { validateResponse } from "../utils/checkResponse";

/**
 * ### Service: Obtiene la lista de productos
 * Envía la petición al backend para obtener la lista de productos.
 * @param {String} token Token de autenticación JWT
 * @param {Number} timeout Tiempo máximo de espera en milisegundos (por defecto: 5000 ms)
 * @returns {Promise<any>} Resultado de la operación cuya estructura será:
 * - `code`: Código de respuesta del API
 * - `message`: Mensaje de error (si `success` es false)
 * - `data`: Datos devueltos por el servicio (si `success` es true)
 */
export async function getProductsService(page, token, timeout = 5000) {
    try {
        const resp = await axios.post(
            import.meta.env.VITE_API_URL + "/get-products",
            { page },
            {
                timeout: timeout,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // console.log("Respuesta de getProducts:", resp.data);
        return validateResponse(resp.data);
    } catch (error) {
        // console.log("Error en getProducts:", error);
        throw new Error("Error en el servicio: " + error.message);
    }
}

/**
 * ### Service: Elimina un producto
 * Toma el id y envía la peticion al backend para eliminar el producto.
 * @param {String} token Token de autenticación JWT
 * @param {Number} timeout Tiempo máximo de espera en milisegundos (por defecto: 5000 ms)
 * @returns {Promise<any>} Resultado de la operación cuya estructura será:
 * - `code`: Código de respuesta del API
 * - `message`: Mensaje de error (si `success` es false)
 * - `data`: Datos devueltos por el servicio (si `success` es true)
 */
export async function delProductService(token, id, timeout = 5000) {
    try {
        const resp = await axios.post(
            import.meta.env.VITE_API_URL + "/delete-product",
            { id },
            {
                timeout,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // console.log("Respuesta de delProductService:", resp.data);
        return validateResponse(resp.data);
    } catch (error) {
        // console.log("Error en delProductService:", error);
        throw new Error("Error en el servicio: " + error.message);
    }
}

/**
 * ### Service: Agrega un producto
 * Recibe los datos (title, subtitle, description, price e image) y lo envía al backend
 * usando FormData para agregar un nuevo producto a la base de datos.
 * @param {String} token Token de autenticación JWT
 * @param {String} title Título del producto
 * @param {String} subtitle Subtítulo del producto
 * @param {String} description Descripción del producto
 * @param {Number} price Precio del producto
 * @param {File} image Imagen del producto
 * @param {Number} timeout Tiempo máximo de espera en milisegundos (por defecto: 5000 ms)
 * @returns {Promise<any>} Resultado de la operación cuya estructura será:
 * - `code`: Código de respuesta del API
 * - `message`: Mensaje de error (si `success` es false)
 */
export async function addProductService(token, title, subtitle, description, price, image, timeout = 5000) {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        const resp = await axios.post(import.meta.env.VITE_API_URL + "/add-product", formData, {
            timeout,
            headers: {
                "Content-Type": "multipart/form-data; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log("Respuesta de delProductService:", resp.data);
        return validateResponse(resp.data);
    } catch (error) {
        // console.log("Error en delProductService:", error);
        throw new Error("Error en el servicio: delProductService" + error.message);
    }
}
