// Servicios
import { getProductsService, delProductService, addProductService } from "../services/apiProductos";

// Contextos
import { useAuth } from "../contexts/AuthContext";

// Constantes
import { ApiCodes } from "../constants/ApiCodes";


/**
 * ### Hook: Manejo de la lista de productos
 * Retorna funciones para obtener y manipular la lista de productos
 * 
 * @returns {Object} Funciones para manejar la lista de productos:
 * - `getProductList`: Función para obtener la lista de productos
 * - `delProduct`: Función para eliminar un producto
 * - `addProduct`: Función para agregar un nuevo producto
 */
export default function useProductList() {
    const { token, onTokenExpired } = useAuth();

    /**
     * ### Hook: Obtiene la lista de productos
     * Utilizando el servicio correspondiente, obtiene la lista de productos solicitando
     * al backend.
     * 
     * @returns {Object} Resultado de la operación con el formato:
     * - `success`: Booleano que indica si la operación fue exitosa
     * - `unauthorized`: Booleano relacionado con la autorización (si aplica)
     * - `products`: Array con los productos (si `success` es true)
     * - `message`: Mensaje de error (si `success` es false)
     */
    async function getProductList(page) {
        try {
            let result = await getProductsService(page, token); // -> Service

            // Éxito!
            if (result.code === ApiCodes.DB_QUERY_SUCCESS) {
                return { success: true, unauthorized: false, data: result.data };
            }

            // Token inválido o expirado
            if (result.code === ApiCodes.TOKEN_EXPIRED || result.code === ApiCodes.TOKEN_FAIL) {
                onTokenExpired();
                return { success: false, unauthorized: true, message: "Token inválido o expirado" };
            }

            // Otro error...
            return { success: false, unauthorized: false, message: "Error al obtener los datos!" };
        } catch (error) {
            return { success: false, unauthorized: false, message: error.message };
        }
    }



    /**
    * ### Hook: Elimina un producto especifico
    * Elimina el producto de la base de datos, utilizando el servicio correspondiente. Luego
    * elimina la imagen asociada al producto del path correspondiente.
    * 
    * @returns  {Promise<any>} Resultado de la operación con el formato:
    * - `success`: Booleano que indica si el resultado final fue exitoso
    * - `unauthorized`: Booleano relacionado con la autorización (si aplica)
    * - `products`: Array con los datos que devuelve el backend (si `success` es true)
    * - `message`: Mensaje de error (si `success` es false)
    */
    async function delProduct(id) {
        try {
            const result = await delProductService(token, id);
            // console.log("Resultado de delProduct:", result);

            // Éxito!
            if (result.code === ApiCodes.DB_QUERY_SUCCESS) {
                return { success: true, unauthorized: false, products: result.data };
            }

            // Token inválido o expirado
            if (result.code === ApiCodes.TOKEN_EXPIRED || result.code === ApiCodes.TOKEN_FAIL) {
                onTokenExpired();
                return { success: false, unauthorized: true, message: "Token inválido o expirado" };
            }

            // Otro error...
            return { success: false, unauthorized: false, message: "Error al obtener los datos!" };
        } catch (error) {
            // console.log("Error en delProduct:", error);
            return { success: false, unauthorized: false, message: error.message };
        }
    }





    /**
    * ### Hook: Agregar Producto
    * Haciendo uso del servicio, envia los datos al backend para agregar un nuevo
    * producto a la base de datos.
    * @returns {Object} Resultado de la operación con el formato:
    * - `success`: Booleano que indica si el resultado final fue exitoso
    * - `unauthorized`: Booleano relacionado con la autorización (si aplica)
    * - `products`: Array con los datos que devuelve el backend (si `success` es true)
    * - `message`: Mensaje de error (si `success` es false)
    */
    async function addProduct(title, subtitle, description, price, image) {
        try {
            const result = await addProductService(token, title, subtitle, description, price, image);
            // console.log("Resultado de addProduct:", result);

            // Éxito!
            if (result.code === ApiCodes.DB_QUERY_SUCCESS) {
                return { success: true, unauthorized: false, products: result.data };
            }

            // Token inválido o expirado
            if (result.code === ApiCodes.TOKEN_EXPIRED || result.code === ApiCodes.TOKEN_FAIL) {
                onTokenExpired();
                return { success: false, unauthorized: true, message: "Token inválido o expirado" };
            }

            // Otro error...
            return { success: false, unauthorized: false, message: "Error al agregar el producto!" };
        } catch (error) {
            // console.log("Error en addProduct:", error);
            return { success: false, unauthorized: false, message: error.message };
        }
    }






    return {
        getProductList,
        delProduct,
        addProduct
    };
}



