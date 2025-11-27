<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/./utils/Debug.php';

header("Access-Control-Allow-Origin: " . HOST_FRONTEND);
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Expose-Headers: Content-Disposition");

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

// Cargar el middleware y manejar la solicitud
require_once __DIR__ . '/middleware/Middleware.php';
Middleware::handle($path);



// Ruteo
switch ($method . " " . $path) {
    // NOTE --> Rutas Públicas
    case 'POST /api/login':
        require_once __DIR__ . '/controllers/AuthController.php';
        AuthController::tryLogin();
        break;



    // NOTE --> Rutas de Usuarios
    case 'POST /api/get-products':
        require_once __DIR__ . '/./controllers/ProductsController.php';
        ProductsController::getProducts();
        break;

    case 'POST /api/search-products': // TODO
        // Código para manejar la ruta /api/search-products
        echo "Buscando productos...";
        break;



    // NOTE --> Rutas de Admin
    case 'POST /api/delete-product':
        require_once __DIR__ . '/controllers/ProductsController.php';
        ProductsController::deleteProduct();
        break;


    case 'POST /api/add-product':
        require_once __DIR__ . '/controllers/ProductsController.php';
        ProductsController::addProduct();
        break;



    // NOTE --> Ruta no encontrada
    default:
        // http_response_code(404);
        require_once __DIR__ . '/./utils/Responder.php';
        Responder::send(ResultCode::UNKNOWN_ACTION, "La ruta solicitada no existe.");
        break;
}
