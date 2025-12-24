import axios from "axios";

// Utils
import { validateResponse } from "../utils/checkResponse.js";
import { ApiCodes } from "../constants/ApiCodes.js";

/**
 * ### Inicia sesión en el sistema
 * 
 * ⚠️ ***IMPORTANTE***: Este servicio fue modificado para funcionar **sin backend**.
 *
 * @param {string} username Usuario
 * @param {string} password Clave del usuario
 * @param {number} timeout Tiempo máximo de espera para la respuesta (ms)
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function loginService(username, password, timeout = 5000) {
    try {
        const resp = await axios.get(
            import.meta.env.VITE_API_URL + "/users.json",
            { timeout: timeout }
        );

        const user = resp.data.find(u => u.username === username && u.password === password);
        if (user) {
            return { code: ApiCodes.AUTH_PASS, message: "Login exitoso", data: user };
        } else {
            return { code: 401, message: "Credenciales inválidas", data: null };
        }
    } catch (err) {
        throw new Error("Error en el servicio: " + err.message);
    }
}