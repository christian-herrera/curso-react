<?php


require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Helpers/Responder_Helper.php';
require_once __DIR__ . '/Helpers/JWT_Helper.php';

header("Access-Control-Allow-Origin: " . ISSUER);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$data = [];



//  ┌─────────────────────────────────────────────────────────┐
//  │          >>   VERIFICACIONES PREVIAS (JWT)   <<         │
//  └─────────────────────────────────────────────────────────┘

// ==> Verifico el token JWT
$resultDecode = JWT_Helper::validate($data);
$rol = $data->rol ?? null;  // Si el token es valido, tomo el rol

if ($resultDecode !== ResultDecode::NO_ERROR || $rol === null) {
    Responder_Helper::FetchData(ResponderCode::INVALID_TOKEN, "Token inválido o inexistente");
    exit;
}


//  ┌─────────────────────────────────────────────────────────┐
//  │        >>   ATIENDO LA CONSULTA SOLICITADA   <<         │
//  └─────────────────────────────────────────────────────────┘

// ==> Obtengo la consulta enviada desde el frontend
$dataIn = json_decode(file_get_contents("php://input"));
if(json_last_error() !== JSON_ERROR_NONE) {
    Responder_Helper::Login(ResponderCode::INVALID_JSON, "JSON inválido recibido");
    exit;
}
$action = trim($dataIn->action ?? '');


// ==> Ejecutar acciones segun la petición
if( $action === 'listar_productos' ) {
    sendListOfProducts();
} else {
    Responder_Helper::FetchData(ResponderCode::INVALID_ACTION, "Acción inválida o no especificada");
    exit;
}




//  ┌─────────────────────────────────────────────────────────┐
//  │       >>   FUNCIONES DE ATENCIÓN DE PETICIONES   <<     │
//  └─────────────────────────────────────────────────────────┘

// ==> Envía la lista de productos al frontend
function sendListOfProducts() {
    global $rol;
    // Tomo los productos del archivo JSON (Simula la toma desde base de datos)
    $productos = json_decode(file_get_contents('./data/productos.json'), true);
    if( json_last_error() !== JSON_ERROR_NONE ) {
        Responder_Helper::FetchData(ResponderCode::INTERNAL_ERROR, "Error interno al obtener los productos");
        exit;
    }
    Responder_Helper::FetchData(ResponderCode::NO_ERROR, "Productos obtenidos exitosamente", $rol, $productos);
}