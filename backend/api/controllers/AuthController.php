<?php

// sudo docker compose exec -it backend bash
// cd app && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
// php composer-setup.php
// php composer.phar require firebase/php-jwt
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;



class AuthController {


    /**
     * ### Realiza el login de un usuario
     * Verifica las credenciales y responde al cliente con la siguiente estructura:
     * ```php
     * [
     *  "result" => true|false,
     *  "message" => "Mensaje descriptivo",
     *  "data" => [
     *      "id" => int,
     *      "name" => string,
     *      "surname" => string,
     *      "is_admin" => bool,
     *      "token" => string (JWT)
     *  ]
     * ]
     * ```
     * @param void
     * @return void
     */
    public static function tryLogin(): void {
        // Recibo y valido el JSON
        $in = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Responder::send(ResultCode::INVALID_JSON, "Error leyendo el JSON recibido!");
            return;
        }
        $username = $in['username'] ?? null;
        $pass = $in['password'] ?? null;
        if (is_null($username) || is_null($pass)) {
            Responder::send(ResultCode::MISSING_FIELDS, "Faltan datos obligatorios!");
            return;
        }

        // Leo de la BD el usuario
        require_once __DIR__ . '/../models/UsersModel.php';
        $db = UserModel::getUserByUsername($username);


        // Verifico si existe
        if ($db["result"] === false) {
            Responder::send(ResultCode::AUTH_FAILED, "Usuario o contraseña incorrectos!");
            return;
        }


        // Verifico la clave
        if (!password_verify($pass, $db["data"]["password_hash"])) {
            Responder::send(ResultCode::AUTH_FAILED, "Usuario o contraseña incorrectos!");
            return;
        }

        // Login exitoso -> Armo el JWT
        try {
            $payloadJTW = ["iat" => time(), "exp" => time() + JWT_EXPIRATION_TIME, "username" => $username, "is_admin" => $db["data"]["is_admin"]];
            $jtw = JWT::encode($payloadJTW, JWT_SECRET_KEY, 'HS256');
        } catch (Exception $e) {
            Responder::send(ResultCode::TOKEN_FAIL, "Error generando el token JWT!");
            return;
        }

        // Respondo con el token
        Responder::send(ResultCode::AUTH_PASS, "Login exitoso!", [
            "id" => $db["data"]["id"],
            "name" => $db["data"]["name"],
            "surname" => $db["data"]["surname"],
            "is_admin" => $db["data"]["is_admin"] === 1 ? true : false,
            "token" => $jtw
        ]);
        return;
    }
}
