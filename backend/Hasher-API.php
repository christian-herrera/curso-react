<?php


require_once __DIR__ . '/config.php';
header("Access-Control-Allow-Origin: " . ISSUER);


$format = 'json';


$dataIn = json_decode(file_get_contents("php://input"));

if (!isset($dataIn->password)) {
    echo json_encode(['error' => 'No password provided']);
    exit;
}
$hashedPassword = password_hash($dataIn->password, PASSWORD_BCRYPT);


if($format === 'json'){
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(['HASH' => $hashedPassword]);
} else {
    header("Content-Type: text/html; charset=UTF-8");
    echo $hashedPassword;
}
