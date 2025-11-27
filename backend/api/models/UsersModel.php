<?php



class UserModel {
    private static $db = null;



    /**
     * ### Inicializa la conexión a la base de datos SQLite.
     * 
     * @return PDO La instancia de la conexión a la base de datos.
     */
    public static function init() {
        if (self::$db == null) {
            $pathDB = __DIR__ . '/../data/my.db';
            self::$db = new PDO("sqlite:$pathDB");
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$db;
    }



    /**
     * ### Crea la tabla de usuarios en la base de datos.
     * 
     * @return array `result` es true si se creó con éxito, false en caso contrario.
     */
    public static function createDB() {
        try {
            $db = self::init();
            $db->exec("
                CREATE TABLE users (
                    id            INTEGER     NOT NULL ON CONFLICT ABORT
                                            PRIMARY KEY ON CONFLICT ABORT AUTOINCREMENT
                                            UNIQUE ON CONFLICT ABORT,
                    name          TEXT (50)   NOT NULL ON CONFLICT ABORT,
                    surname       TEXT (50)   NOT NULL ON CONFLICT ABORT,
                    username      TEXT (60)   NOT NULL ON CONFLICT ABORT
                                            UNIQUE ON CONFLICT ABORT,
                    password_hash TEXT (64)   NOT NULL ON CONFLICT ABORT,
                    is_admin      INTEGER (1) NOT NULL ON CONFLICT ABORT
                                            DEFAULT (0) 
                );
            ");
            Debug::log("Tabla 'users' creada con éxito.");
            return ["result" => true];
        } catch (PDOException $e) {
            Debug::error("Error al crear la tabla 'users': " . $e->getMessage());
            return ["result" => false, "message" => "No se logró crear la tabla 'products'"];
        }
    }



    /**
     * ### Obtiene un usuario por su Username
     * Retorna en `data` un array con los datos del usuario:
     * ```php
     * [
     *  "id" => int,
     *  "name" => string,
     *  "surname" => string,
     *  "is_admin" => bool,
     *  "password_hash" => string
     * ]
     * ```
     * 
     * @param string $username El nombre de usuario a buscar.
     * @return array|null `result` es true si se encontró el usuario, false en caso contrario. `data` contiene los datos del usuario.
     */
    public static function getUserByUsername($username) {
        try {
            $db = self::init();
            $stmt = $db->prepare("SELECT id, name, surname, is_admin, password_hash FROM users WHERE username = :username");
            $stmt->execute([":username" => $username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            Debug::log("Usuario '$username' obtenido de la base de datos.");

            return [
                "result" => $user !== false,
                "data" => $user
            ];
        } catch (PDOException $e) {
            Debug::error("Error al obtener el usuario '$username': " . $e->getMessage());
            return ["result" => false, "message" => "Error al obtener el usuario"];
        }
    }
}
