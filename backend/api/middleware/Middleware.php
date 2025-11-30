<?php


require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../utils/Responder.php';

// sudo docker compose exec -it backend bash
// cd app && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
// php composer-setup.php
// php composer.phar require firebase/php-jwt
require_once __DIR__ . "/../../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;


class Middleware {
    private static $publicRoutes = PUBLIC_ROUTES;
    private static $userRoutes = USER_ROUTES;
    private static $adminRoutes = ADMIN_ROUTES;


    /**
     * ### Maneja el middleware para las rutas
     * Verifica si la ruta es pública, de usuario o de admin y procesa el JWT. Si no se garantiza el acceso, responde con el error correspondiente.
     * @param string $path La ruta solicitada
     * @return void
     */
    public static function handle($path) {
        // Rutas públicas
        if (in_array($path, self::$publicRoutes)) {
            return;
        }

        // Rutas de usuario (no requieren ser admin)
        if (in_array($path, self::$userRoutes)) {
            $jwtResult = self::processJWT();
            if (!$jwtResult["result"]) {
                Responder::send($jwtResult["error"], $jwtResult["message"]);
                exit;
            }
        }

        // Rutas de admin
        if (in_array($path, self::$adminRoutes)) {
            $jwtResult = self::processJWT();
            if (!$jwtResult["result"]) {
                Responder::send($jwtResult["error"], $jwtResult["message"]);
                exit;
            }
            // Verifico si es admin
            if (!$jwtResult["payload"]["is_admin"]) {
                Responder::send(ResultCode::AUTH_ADMIN_REQUIRED, "No tienes permisos para acceder a esta ruta!");
                exit;
            }
        }
    }


    /**
     * ### Procesa y valida el JWT
     * Lee el token JWT de los headers, lo decodifica y valida. Retorna un array con el resultado.
     * @return array Un array con las claves:
     * - `result`: bool, true si el token es válido, false en caso contrario
     * - `payload`: array, los datos del payload si el token es válido
     * - `error`: int, el código de error si el token no es válido
     * - `message`: string, el mensaje descriptivo del error si el token no es válido
     */
    private static function processJWT() {
        try {
            // Lo leo de los Headers
            $headers = getallheaders();
            $jwtToken = $headers['Authorization']
                ?? $headers['authorization']
                ?? $_SERVER['HTTP_AUTHORIZATION']
                ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
                ?? null;

            // Null o vacío -> Error
            if (is_null($jwtToken) || !str_starts_with($jwtToken, 'Bearer '))
                return ["result" => false, "error" => ResultCode::TOKEN_FAIL, "message" => "El token no fue proporcionado!"];

            // Quito el "Bearer "
            $jtwToken = str_replace('Bearer ', '', $jwtToken);

            // Decodifico el JWT
            $payload = JWT::decode($jtwToken, new Key(JWT_SECRET_KEY, 'HS256'));
            return ["result" => true, "payload" => ["username" => $payload->username, "is_admin" => $payload->is_admin]];
        } catch (ExpiredException $e) {
            return ["result" => false, "error" => ResultCode::TOKEN_EXPIRED, "message" => "El token ha expirado!"];
        } catch (SignatureInvalidException $e) {
            return ["result" => false, "error" => ResultCode::TOKEN_FAIL, "message" => "Firma del token inválida!"];
        } catch (Exception $e) {
            return ["result" => false, "error" => ResultCode::TOKEN_FAIL, "message" => "Token inválido!"];
        }
    }
}
