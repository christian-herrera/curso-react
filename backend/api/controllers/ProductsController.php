<?php

require_once __DIR__ . '/../utils/Responder.php';


class ProductsController {


    /**
     * ### Devuelve la lista de productos al cliente
     * Si el cliente no especifica un límite, se devuelven 10 productos por defecto. El 
     * límite máximo permitido es de 30 productos.
     */
    public static function getProducts(): void {
        // Recibo y valido el JSON
        $in = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Responder::send(ResultCode::INVALID_JSON, "Error leyendo el JSON recibido!");
            return;
        }
        $page = isset($in['page']) ? intval($in['page']) : 1;  // default 1
        $page = max(1, $page);  // mínimo 1

        // Leo de la BD
        require_once __DIR__ . '/../models/ProductsModel.php';
        $result = ProductsModel::getProducts($page);

        if (!$result["result"]) {
            Responder::send(ResultCode::DB_QUERY_ERROR, "Error al leer de la tabla 'productos'!");
            return;
        }
        Responder::send(ResultCode::DB_QUERY_SUCCESS, "Lectura correcta", $result["data"]);
    }



    /**
     * ### Elimina un producto de la base de datos
     * El controlador se encarga de recibir el ID del producto a eliminar, obtener
     * el nombre de la imagen asociada al producto, eliminar el registro de la base de datos
     * y luego eliminar la imagen del sistema de archivos.
     */
    public static function deleteProduct(): void {
        // Recibo y valido el JSON
        $in = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Responder::send(ResultCode::INVALID_JSON, "Error leyendo el JSON recibido!");
            return;
        }
        $id = $in['id'] ?? null;


        // Leo de la BD la imagen
        require_once __DIR__ . '/../models/ProductsModel.php';
        $db = ProductsModel::getProductImage($id);
        if (!$db["result"]) {
            Responder::send(ResultCode::DB_QUERY_ERROR, "Error al leer la imagen del producto!");
            return;
        }
        $imgName = $db["data"]["image"];
        $path_img = PATH_IMAGES . $imgName;


        // Verifico si hay mas productos con la misma imagen
        $db = ProductsModel::countProductsByImage($imgName);
        if (!$db["result"]) {
            Responder::send(ResultCode::DB_QUERY_ERROR, "Error al verificar productos con la misma imagen!");
            return;
        }
        if ($db["data"] === 1 && file_exists($path_img)) {
            unlink($path_img);
        }

        // Elimino el producto de la base de datos
        $db = ProductsModel::deleteProduct($id);
        if (!$db["result"]) {
            Responder::send(ResultCode::DB_QUERY_ERROR, "Error al eliminar el producto!");
            return;
        }

        Responder::send(ResultCode::DB_QUERY_SUCCESS, "Producto eliminado correctamente");
    }



    /**
     * ### Agrega un nuevo producto a la base de datos
     * El controlador recibe todos los datos del producto (title, subtitle, description,
     * image, price) y se encarga de validar y almacenar la imagen en el sistema.
     * Se verifica:
     * - Que todos los datos obligatorios estén presentes.
     * - Que la imagen sea de tipo JPEG o PNG.
     * - Se genera un hash SHA-256 de la imagen para evitar duplicados.
     * - Se mueve la imagen al directorio de imágenes.
     * Si todo es correcto, se agrega el registro a la base de datos.
     */
    public static function addProduct(): void {
        // Campos que deben venir en el form-data
        $title = $_POST['title'] ?? null;
        $subtitle = $_POST['subtitle'] ?? null;
        $description = $_POST['description'] ?? null;
        $price = $_POST['price'] ?? null;

        if (!$title || !$subtitle || !$description || !$price) {
            Responder::send(ResultCode::INVALID_JSON, "Faltan datos obligatorios para agregar el producto.");
            return;
        }

        // Verifico que la imagen sea correcta
        $imagen = $_FILES['image'] ?? null;
        if (!$imagen || $imagen['error'] !== UPLOAD_ERR_OK) {
            Responder::send(ResultCode::MISSING_FIELDS, "Error al subir la imagen del producto.");
            return;
        }

        // Proceso la extension y el hash
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($imagen['tmp_name']);
        $extension = $mimeType === 'image/jpeg' ? '.jpg' : ($mimeType === 'image/png' ? '.png' : null);
        if (!$extension) {
            Responder::send(ResultCode::FILE_UPLOAD_ERROR, "Tipo de imagen no soportado. Solo se permiten JPEG y PNG.");
            return;
        }

        $hash = hash_file('sha256', $imagen['tmp_name']);
        $imageName = $hash . $extension;
        $imgDestino = PATH_IMAGES . $imageName;

        // --> Todos los datos llegaron correctamente, agrego a la BD
        require_once __DIR__ . '/../models/ProductsModel.php';
        $db = ProductsModel::addProduct($title, $subtitle, $description, $imageName, $price);
        if (!$db["result"]) {
            Responder::send(ResultCode::DB_QUERY_ERROR, "Error al agregar el producto: " . ($db["message"] ?? ""));
            return;
        }


        // Muevo la imagen al sistema de archivos
        if (file_exists($imgDestino)) {
            Debug::log("La imagen ya existe en el sistema de archivos, no se agrega al directorio");
        } else {
            if (!move_uploaded_file($imagen['tmp_name'], $imgDestino)) {
                Responder::send(ResultCode::FILE_UPLOAD_ERROR, "Error al mover la imagen al sistema de archivos.");
                return;
            }
        }

        // Subido correctamente!
        Responder::send(ResultCode::DB_QUERY_SUCCESS, "Producto agregado correctamente.");
        return;
    }
}
