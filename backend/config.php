<?php


// ┌─────────────────────────────────────────────────────────┐
// │            >>   CONFIGURACIÓN GENERAL   <<              │
// └─────────────────────────────────────────────────────────┘
define('API_VERSION', '0.3.1');

define('HOST_FRONTEND', 'http://localhost:30500');
define('HOST_BACKEND', HOST_FRONTEND);

define('PATH_ROOT', __DIR__);
define('PATH_IMAGES', PATH_ROOT . '/public/images/');
define('URI_IMAGES', HOST_BACKEND . '/public/images/');

define('PATH_SQLITE_DB', PATH_ROOT . '/api/data/my.db');


// ┌─────────────────────────────────────────────────────────┐
// │        >>   PARÁMETROS PARA EL TOKEN JWT   <<           │
// └─────────────────────────────────────────────────────────┘
define('JWT_SECRET_KEY', 'mi_clave_secreta_ultra_segura');
define('JWT_EXPIRATION_TIME', 60 * 60); // 1 hora



// ┌─────────────────────────────────────────────────────────┐
// │                    >>   RUTAS   <<                      │
// └─────────────────────────────────────────────────────────┘
define("PUBLIC_ROUTES", [
    '/api/login',
]);

define("USER_ROUTES", [
    '/api/get-products',
    '/api/search-products' // TODO --> implementar
]);

define("ADMIN_ROUTES", [
    '/api/delete-product',
    '/api/add-product'
]);



// ┌─────────────────────────────────────────────────────────┐
// │           >>   CONFIGURACIÓN DE DEBUG   <<              │
// └─────────────────────────────────────────────────────────┘
define('DEBUG_ENABLE', true);
define('DEBUG_PATH', PATH_ROOT . '/logs/debug.log');