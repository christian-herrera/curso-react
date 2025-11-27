import axios from "axios";

// Utils
import { validateResponse } from "../utils/checkResponse.js";

/**
 * ### Inicia sesión en el sistema
 *
 * @param {string} username Usuario
 * @param {string} password Clave del usuario
 * @param {number} timeout Tiempo máximo de espera para la respuesta (ms)
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function loginService(username, password, timeout = 5000) {
    try {
        const resp = await axios.post(
            import.meta.env.VITE_API_URL + "/login",
            {
                username,
                password,
            },
            { timeout: timeout, headers: { "Content-Type": "application/json" } }
        );
        return validateResponse(resp.data);
    } catch (err) {
        throw new Error("Error en el servicio: " + err.message);
    }
}