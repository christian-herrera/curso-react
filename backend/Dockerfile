# -> backend/Dockerfile
FROM php:8.3-fpm

# Instalar extensiones de PHP necesarias
RUN apt-get update && apt-get install -y libsqlite3-dev && docker-php-ext-install pdo_sqlite

# Configurar el directorio de trabajo
WORKDIR /app

# Ejecutar PHP-FPM
CMD ["php-fpm"]
