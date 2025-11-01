FROM php:8.3.27-apache

RUN docker-php-ext-install pdo pdo_mysql mysqli

RUN a2enmod rewrite

COPY . /var/www/html


RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

ENV APACHE_DOCUMENT_ROOT=/var/www/html
ENV PHP_DISPLAY_ERRORS=1
ENV PHP_ERROR_REPORTING=E_ALL

EXPOSE 80