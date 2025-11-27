// ### Constantes de códigos de API
// Este archivo define los códigos de estado que el backend utiliza
// para comunicar el resultado de las operaciones al frontend.
export const ApiCodes = Object.freeze({
    // Sin errores
    NO_ERROR: 0,

    // Procesamiento del JSON
    INVALID_JSON: 100,
    MISSING_FIELDS: 101,
    UNKNOWN_ACTION: 102,

    // Token JWT
    TOKEN_FAIL: 200,
    TOKEN_EXPIRED: 201,

    // Usuarios
    AUTH_PASS: 300,
    AUTH_FAILED: 301,
    AUTH_ADMIN_REQUIRED: 302,

    // Base de datos
    DB_CONNECT_ERROR: 400,
    DB_QUERY_SUCCESS: 401,
    DB_QUERY_ERROR: 402,

    // Subida de archivos
    FILE_UPLOAD_ERROR: 500,
    FILE_DELETE_ERROR: 501,

    // Errores genéricos
    EXCEPTION_ERROR: 600
});