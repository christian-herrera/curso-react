/**
 * ### Valida la respuesta del servidor
 * El servidor siempre responde con un objeto que contiene las propiedades:
 * - `code`: Código de estado de la respuesta
 * - `message`: Mensaje descriptivo
 * - `data`: Datos adicionales (puede ser cualquier tipo de dato)
 * @param {Object} data Respuesta del servidor
 * @throws {Error} Si la respuesta no es válida
 * @returns {Object} Respuesta validada
 */
export function validateResponse(data) {
    if (!data || typeof data !== "object" || typeof data.code === "undefined" || typeof data.message === "undefined" || typeof data.data === "undefined") {
        throw new Error("Respuesta inválida del servidor!");
    }
    return data;
}