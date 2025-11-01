<?php


enum ResponderCode: int {
    case NO_ERROR = 0;
    case INVALID_TOKEN = 1000;
    case TOKEN_EXPIRED = 1001;
    case INVALID_SIGNATURE = 1002;
    case NO_DATA_PROVIDED = 1003;
    case INVALID_CREDENTIALES = 1004;
    case INVALID_JSON = 1005;
    case LOGIN_SUCCESS = 2000;
    case INVALID_ACTION = 3000;
    case INTERNAL_ERROR = 9999;
}


class Responder_Helper {
    /**
     * ## Envía respuesta del login al frontend
     * La respuesta JSON tiene el siguiente formato:
     * ```json
     * {"result": bool, "code": int, "message": string, "token": string, "data": array}
     * ```
     * Y se forma en funcion del `$code` proporcionado.
     */
    public static function Login($code, $message = null, $token = null, $data = null) {
        $resp = [
            'result' => $code === ResponderCode::NO_ERROR,
            'code' => $code,
            'message' => $message ?? "-",
            'token' => $token,
            'data' => $data
        ];


        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }






    /**
     * ## Envía respuesta del fetch de datos al frontend
     * La respuesta JSON tiene el siguiente formato:
     * ```json
     * {"result": bool, "code": int, "message": string, "rol": string, "data": array}
     * ```
     * Y se forma en funcion del `$code` proporcionado.
     */
    public static function FetchData($code, $message = null, $rol = null, $data = null) {
        $resp = [
            'result' => $code === ResponderCode::NO_ERROR,
            'code' => $code,
            'message' => $message ?? "-",
            'rol' => $rol,
            'data' => $data
        ];

        echo json_encode($resp, JSON_UNESCAPED_UNICODE);
    }
}
