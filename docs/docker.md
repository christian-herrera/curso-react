[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)


<h1>Docker</h1>
<h2>Tabla de contenidos</h2>

- [Introducción](#introducción)
  - [Comandos Útiles](#comandos-útiles)
- [Estructura del `docker-compose.yml`](#estructura-del-docker-composeyml)
  - [BackEnd](#backend)
  - [Frontend](#frontend)
- [Settings para Linux](#settings-para-linux)

<br><br>

# Introducción
## Comandos Útiles

|        Comando         | Observaciones                                                                                                                                                   |
| :--------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker compose up -d` | Inicializa el contenedor en modo detached                                                                                                                       |
| `docker compose down`  | Detiene y elimina los contenedores, pero mantiene los volumenes.<br>Si se agrega `-v` se logra eliminar todos los volumenes asociados,<br>dejando a MySQL como nuevo. |





<br><br>

# Estructura del `docker-compose.yml`

Se exponen tres servicios: 
- ***`vite`***: Utiliza un DockerFile personalizado ubicado en `/frontend/Dockerfile`.
- ***`php`***: Utiliza una DockerFile personalizado ubicado en `/backend/Dockerfile`.
- ***`nginx`***: Utiliza una imagen oficial de Nginx y un archivo de configuración personalizado ubicado en `/backend/docker/default.conf`.

<br><br>

## BackEnd

El backend está compuesto por dos servicios: ***`php`*** y ***`nginx`***. En conjunto permiten servir una aplicación PHP a través de un servidor web Nginx.

***`nginx`*** escucha sobre el puerto `30500` y redirige las peticiones en funcion de la URL solcitada. 
- Si la URL comienza con `/api` oi bíen es un archivo `.php`, las peticiones son redirigidas al servicio ***`php`***, que escucha en el puerto `9000` y maneja las solicitudes PHP utilizando PHP-FPM. 
- En el resto de los casos, las peticiones son enviadas a el servicio ***`vite`***, que sirve el frontend de la aplicación.
<br><br>

## Frontend

El servicio ***`vite`*** se encarga de servir la aplicación frontend desarrollada con Vite. Este servicio utiliza una imagen oficial de Node.js y monta la app sobre el puerto `5173` permitiendo el acceso a la aplicación desde el navegador.


<br><br>

# Settings para Linux
En linux es posible que se necesiten algunos ajustes adicionales para que Docker funcione correctamente con permisos de usuario.

> [!TIP]
> ### Permitir Tráfico entre contenedores Docker y el host con UFW
> Editar el archivo: `/etc/default/ufw` y configurar la siguiente linea:
> ```
>DEFAULT_FORWARD_POLICY="ACCEPT" 
>```

<br>

> [!TIP]
> ### Usar Docker sin sudo
> Agregar el usuario actual al grupo `docker` con el siguiente comando:
> ```bash
> sudo usermod -aG docker $USER
> newgrp docker $USER
> ```
> Luego, intentar ejecutar comandos como `docker compose up -d` sin `sudo`.
