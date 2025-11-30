<?php


require_once __DIR__ . './../../config.php';
require_once __DIR__ . '/../utils/Debug.php';



class ProductsModel {
    private static $db = null;



    /**
     * ### Inicializa la conexión a la base de datos SQLite.
     * 
     * @return PDO La instancia de la conexión a la base de datos.
     */
    public static function init(): PDO {
        if (self::$db == null) {
            $pathDB = __DIR__ . '/../data/my.db';
            self::$db = new PDO("sqlite:$pathDB");
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$db;
    }



    /**
     * ### Obtiene la lista de productos
     * Devuelve los datos limitando la cantidad de productos según el parámetro `$limit`.
     * 
     * @param int $limit Cantidad máxima de productos a obtener.
     * @return array retorna un array con los campos:
     * - `result` es true si se obtuvo con éxito, false en caso contrario. 
     * - `data` contiene los productos si `result` es true.
     * - `message` contiene el mensaje de error si `result` es false.
     */
    public static function getProducts(int $page = 1): array {
        try {
            $db = self::init();

            // Obtengo la página consultada
            $stmt = $db->prepare("
                SELECT 
                    id, title, subtitle, description, price, 
                    '" . URI_IMAGES . "' || image AS image
                FROM products ORDER BY id DESC LIMIT :limit OFFSET :offset
            ");
            $stmt->bindValue(':limit', API_PRODUCTS_PER_PAGE, PDO::PARAM_INT);
            $stmt->bindValue(':offset', ($page - 1) * API_PRODUCTS_PER_PAGE, PDO::PARAM_INT);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Obtengo el total de productos
            $stmt = $db->prepare("SELECT COUNT(*) AS total FROM products");
            $stmt->execute();
            $total_products = $stmt->fetch(PDO::FETCH_ASSOC)["total"];

            $resp = [
                "products" => $products,
                "current_page" => $page,
                "total_pages" => ceil($total_products / API_PRODUCTS_PER_PAGE),
                "total_products" => $total_products,
                "products_per_page" => API_PRODUCTS_PER_PAGE
            ];

            Debug::log("Productos leídos con éxito de la base de datos.");
            return ["result" => true, "data" => $resp];
        } catch (PDOException $e) {
            Debug::error("Error al obtener productos: " . $e->getMessage());
            return ["result" => false, "message" => "Error al leer de la base de datos"];
        }
    }



    /**
     * ### Elimina un producto por su ID
     * Realiza el `DELETE` en la base de datos, pero no elimina la imagen del sistema de archivos.
     * 
     * @param int $id ID del producto a eliminar.
     * @return array retorna un array con los campos:
     * - `result` es true si se obtuvo con éxito, false en caso contrario. 
     * - `data` contiene los productos si `result` es true.
     * - `message` contiene el mensaje de error si `result` es false.
     */
    public static function deleteProduct(int $id): array {
        try {
            $db = self::init();
            $stmt = $db->prepare("DELETE FROM products WHERE id = :id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                Debug::log("No se encontró ningún producto con ID $id para eliminar.");
                return ["result" => false, "message" => "Producto no encontrado"];
            }

            Debug::log("Producto con ID $id eliminado con éxito de la base de datos.");
            return ["result" => true];
        } catch (PDOException $e) {
            Debug::error("Error al eliminar producto: " . $e->getMessage());
            return ["result" => false, "message" => "Error al eliminar el producto de la base de datos"];
        }
    }


    /**
     * ### Obtiene la imagen de un producto por su ID
     * Devuelve el nombre de la imagen asociada al producto cuyo ID se proporciona.
     * @param int $id ID del producto.
     * @return array retorna un array con los campos:
     * - `result` es true si se obtuvo con éxito, false en caso contrario. 
     * - `data` contiene los productos si `result` es true.
     * - `message` contiene el mensaje de error si `result` es false.
     */
    public static function getProductImage(int $id): array {
        try {
            $db = self::init();
            $stmt = $db->prepare("SELECT image FROM products WHERE id = :id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $img = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$img) {
                Debug::log("No se encontró ningún producto con ID $id.");
                return ["result" => false, "message" => "Producto no encontrado"];
            }

            Debug::log("La imagen se leyó con éxito de la base de datos.");
            return ["result" => true, "data" => $img];
        } catch (PDOException $e) {
            Debug::error("Error al obtener la imagen del producto: " . $e->getMessage());
            return ["result" => false, "message" => "Error al leer de la base de datos"];
        }
    }



    /**
     * ### Cuenta la cantidad de productos con la misma imagen
     * Dado que al eliminar un producto se requiere eliminar la imagen del path, entonces esto
     * permite saber si hay mas de un producto con la misma imagen.
     * @param string $imageName Nombre de la imagen.
     * @return array retorna un array con los campos:
     * - `result` es true si se obtuvo con éxito, false en caso contrario. 
     * - `data` contiene los productos si `result` es true.
     * - `message` contiene el mensaje de error si `result` es false.     
     */
    public static function countProductsByImage(string $imageName): array {
        try {
            $db = self::init();
            $stmt = $db->prepare("SELECT COUNT(*) AS count FROM products WHERE image = :image");
            $stmt->bindValue(':image', $imageName, PDO::PARAM_STR);
            $stmt->execute();
            $count = $stmt->fetch(PDO::FETCH_ASSOC);

            Debug::log("Conteo de productos con la misma imagen realizado con éxito.");
            return ["result" => true, "data" => $count['count']];
        } catch (PDOException $e) {
            Debug::error("Error al contar productos por imagen: " . $e->getMessage());
            return ["result" => false, "message" => "Error al leer de la base de datos"];
        }
    }



    /**
     * ### Agrega un nuevo producto a la base de datos
     * Agrega un nuevo producto con los datos proporcionados a la tabla `products`.
     * 
     * @param string $title Título del producto.
     * @param string $subtitle Subtítulo del producto.
     * @param string $description Descripción del producto.
     * @param string $imageName Nombre de la imagen del producto.
     * @param int $price Precio del producto.
     * @return array retorna un array con los campos:
     * - `result` es true si se obtuvo con éxito, false en caso contrario. 
     * - `data` contiene los productos si `result` es true.
     * - `message` contiene el mensaje de error si `result` es false.     * 
     */
    public static function addProduct(string $title, string $subtitle, string $description, string $imageName, int $price): array {
        try {
            $db = self::init();
            $stmt = $db->prepare("
                INSERT INTO products (title, subtitle, description, image, price)
                VALUES (:title, :subtitle, :description, :image, :price)
            ");
            $stmt->bindValue(':title', $title, PDO::PARAM_STR);
            $stmt->bindValue(':subtitle', $subtitle, PDO::PARAM_STR);
            $stmt->bindValue(':description', $description, PDO::PARAM_STR);
            $stmt->bindValue(':image', $imageName, PDO::PARAM_STR);
            $stmt->bindValue(':price', $price, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                Debug::log("No se pudo agregar el producto a la base de datos.");
                return ["result" => false, "message" => "Error, el producto puede que ya exista"];
            }

            Debug::log("Producto agregado con éxito a la base de datos.");
            return ["result" => true];
        } catch (PDOException $e) {
            Debug::error("Error al agregar producto: " . $e->getMessage());
            return ["result" => false, "message" => "Error al agregar el producto a la base de datos"];
        }
    }
}
