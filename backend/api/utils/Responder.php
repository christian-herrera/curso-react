<?php


enum ResultCode: int {
    case NO_ERROR = 0;

        // Procesamiento del JSON
    case INVALID_JSON = 100;
    case MISSING_FIELDS = 101;
    case UNKNOWN_ACTION = 102;

        // Token JWT
    case TOKEN_FAIL = 200;
    case TOKEN_EXPIRED = 201;

        // Usuarios
    case AUTH_PASS = 300;
    case AUTH_FAILED = 301;
    case AUTH_ADMIN_REQUIRED = 302;

        // Base de datos
    case DB_CONNECT_ERROR = 400;
    case DB_QUERY_SUCCESS = 401;
    case DB_QUERY_ERROR = 402;

        // Subida de archivos
    case FILE_UPLOAD_ERROR = 500;
    case FILE_DELETE_ERROR = 501;

        // Errores genéricos
    case EXCEPTION_ERROR = 600;
}


/**
 * ### Clase para enviar respuestas JSON al cliente
 * El Responder permite enviar respuestas JSON al cliente de forma estandarizada.
 * Cada respuesta incluye un código de resultado, un mensaje y datos opcionales.
 */
class Responder {

    /**
     * ### Envía una respuesta JSON al cliente
     * @param ResultCode $code Código de resultado de la operación
     * @param string $message Mensaje descriptivo de la respuesta
     * @param mixed|null $data Datos adicionales a incluir en la respuesta
     */
    public static function send(ResultCode $code, string $message = "-", mixed $data = null): void {
        $resp = [
            'code' => $code->value,
            'message' => $message ?? "-",
            'data' => $data
        ];

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }
}
