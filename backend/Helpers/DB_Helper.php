<?php

// # Forma de Usar:
// 
// ```php
// require_once __DIR__ . '/Helpers/DB_Helper.php';
// 
// $mysql = DB_Helper::getInstance();
// $db = $mysql->getConnection();
// 
// if(is_null($db)) {
//   // Error de conexión
//   exit;
// }
// 
// $row = $mysql->getOneRow("SELECT * FROM usuarios WHERE id = :id", [':id' => 1]);
// if($row) {
//    // Hacer algo con $row
// }
// ```



/**
 * ## Clase Database - Singleton
 * Permite manejar las conexiones a la base de datos usando el patrón Singleton. 
 * Esto asegura que solo exista una única conexión a la base de datos durante el ciclo de vida
 * del script PHP.
 * 
 * PHP crea la instancia en la llamada a `Database::getInstance()`. Se mantiene la misma instancia
 * para todo el script y solo se destruye al finalizar el script.
 */
class DB_Helper {
    private static $instance = null; // `static`, compartido con todos los objetos
    private $pdo;

    /**
     * ## Constructor privado
     */
    public function __construct() {
        require_once __DIR__ . '/../config.php';

        try {
            $this->pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET . ";port=" . DB_PORT,
                DB_USER,
                DB_PASS,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            // echo ("Error de conexión: " . $e->getMessage());
        }
    }

    /**
     * ## Destructor de la clase Database
     */
    public function __destruct() {
        $this->pdo = null; // Cierra la conexión
    }


    /**
     * ## Devuelve la instancia
     * Si no existe, la crea usando el constructor privado.
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self(); // Llama al constructor de esta clase
        }
        return self::$instance;
    }


    /**
     * ## Devuelve la conexión PDO actual
     * Luego de obtener la instancia con `getInstance()`, se puede llamar a este método
     * para obtener la conexión PDO y hacer consultas.
     */
    public function getConnection() {
        return $this->pdo;
    }


    /**
     * ## Devuelve una fila de la base de datos
     * Se puede comprobar el resultado con `if ($result) { ... } else { ... }`
     */
    public function getOneRow($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
