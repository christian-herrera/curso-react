<?php

// ┌─────────────────────────────────────────────────────────┐
// │       >>   URL DE LA QUE ACEPTA PETICIONES   <<         │
// └─────────────────────────────────────────────────────────┘
define('ISSUER', 'http://localhost');  // Issuer


// ┌─────────────────────────────────────────────────────────┐
// │        >>   PARÁMETROS PARA EL TOKEN JWT   <<           │
// └─────────────────────────────────────────────────────────┘
define('KEY_SECRET', 'mi_clave_secreta_ultra_segura'); 
define('EXPIRATION_TIME', 60 * 60); // 1 hora

// Define la forma en que PHP toma la cabecera Authorization
//  true: Usa $_SERVER con lo cual, se debe agregar la linea: "SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1" en el .htaccess
//  false: Usa getallheaders() (no requiere configuración extra en el servidor)
define('USE_SERVER_HEADERS', false);


// ┌─────────────────────────────────────────────────────────┐
// │        >>   PARÁMETROS DE CONEXIÓN A LA BD   <<         │
// └─────────────────────────────────────────────────────────┘
define('DB_HOST', 'db');
define('DB_NAME', 'dev');
define('DB_USER', 'devuser');
define('DB_PASS', 'devpassword');
define('DB_CHARSET', 'utf8mb4');
define('DB_PORT', 3306);