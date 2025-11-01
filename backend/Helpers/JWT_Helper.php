<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;

enum ResultDecode: int {
    case NO_ERROR = 0;
    case INVALID_TOKEN = 1000;
    case TOKEN_EXPIRED = 1001;
    case INVALID_SIGNATURE = 1002;
}

class JWT_Helper {
    /**
     * ## Genera un token JWT con el correo electrónico y rol proporcionados.
     * Devuelve el token JWT generado, o lanza una excepción en caso de error.
     */
    public static function generate(string $email, string $rol) {
        $payload = [
            'iss' => ISSUER,
            'iat' => time(),
            'exp' => time() + EXPIRATION_TIME, // 1 hora de val
            'email' => $email,
            'rol' => $rol
        ];
        return JWT::encode($payload, KEY_SECRET, 'HS256');
    }



    /**
     * ## Lee las cabeceras y verifica el token JWT.
     * - Si es válido, devuelve los datos decodificados del token.
     * - Si no es válido o no existe, devuelve un mensaje de error correspondiente.
     */
    public static function validate(array &$data): ResultDecode {
        $resp = [];
        $headers = [];
        
        if(USE_SERVER_HEADERS) {
            if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
                $headers["authorization"] = $_SERVER['HTTP_AUTHORIZATION'];
            } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
                $headers["authorization"] = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
            }
        } else {
            $headers = array_change_key_case(getallheaders(), CASE_LOWER);
        }


        if (isset($headers["authorization"])) {
            $token = str_replace("Bearer ", "", $headers["authorization"]);

            try {
                $data = JWT::decode($token, new Key(KEY_SECRET, 'HS256'));     // Decode
                return ResultDecode::NO_ERROR;
            } catch (ExpiredException $e) {
                return ResultDecode::TOKEN_EXPIRED;
            } catch (SignatureInvalidException $e) {
                return ResultDecode::INVALID_SIGNATURE;
            } catch (Exception $e) {
                return ResultDecode::INVALID_TOKEN;
            }

            exit;
        } else {
            return ResultDecode::TOKEN_EXPIRED;
        }
    }
}
