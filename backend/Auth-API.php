<?php


require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Helpers/JWT_Helper.php';
require_once __DIR__ . '/Helpers/DB_Helper.php';
require_once __DIR__ . '/Helpers/Responder_Helper.php';

header("Access-Control-Allow-Origin: " . ISSUER);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

//  ┌─────────────────────────────────────────────────────────┐
//  │            >>   PROCESAMIENTO DEL LOGIN   <<            │
//  └─────────────────────────────────────────────────────────┘
// ==> Leo los datos enviados
$dataIn = json_decode(file_get_contents("php://input"));
if(json_last_error() !== JSON_ERROR_NONE) {
    Responder_Helper::Login(ResponderCode::INVALID_JSON, "JSON inválido recibido");
    exit;
}


// ==> Valido que vengan los datos obligatorios
$email = trim($dataIn->email ?? '');
$clave = trim($dataIn->clave ?? '');
if ($email === '' || $clave === '') {
    Responder_Helper::Login(ResponderCode::NO_DATA_PROVIDED, "Faltan campos obligatorios");
    exit;
}


// ==> Busco en la base de datos
$db = DB_Helper::getInstance();
$row = $db->getOneRow(
    "SELECT id, rol, clave_hash, nombre, apellido FROM usuarios WHERE email = :email",
    [':email' => $email]
);


// ==> Si el usuario existe, verifico la contraseña
if (!$row || !password_verify($clave, $row['clave_hash'])) {
    Responder_Helper::Login(ResponderCode::INVALID_CREDENTIALES, "Credenciales invalidas");
    exit;
}


// ==> Si existe, devuelvo los datos
$token = JWT_Helper::generate($email, $row['rol']);
Responder_Helper::Login(ResponderCode::NO_ERROR, "Login exitoso!", $token, [
    'id' => $row['id'],
    'nombre' => $row['nombre'],
    'apellido' => $row['apellido'],
    'email' => $email,
    'rol' => $row['rol']
]);



exit;
