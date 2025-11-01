[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)


<h1>Docker</h1>
<h2>Tabla de contenidos</h2>

- [Introducción](#introducción)
  - [Comandos Útiles](#comandos-útiles)
- [Estructura del `docker-compose.yml`](#estructura-del-docker-composeyml)
  - [DataBase](#database)
  - [BackEnd](#backend)
  - [Network](#network)

<br><br>

# Introducción
## Comandos Útiles

|        Comando         | Observaciones                                                                                                                                                   |
| :--------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker compose up -d` | Inicializa el contenedor en modo detached                                                                                                                       |
| `docker compose down`  | Detiene y elimina los contenedores, pero mantiene los volumenes.<br>Si se agrega `-v` se logra eliminar todos los volumenes asociados,<br>dejando a MySQL como nuevo. |





<br><br>

# Estructura del `docker-compose.yml`

Se exponen dos servicios: ***`db`*** y ***`backend`***.

## DataBase

- `image` permite definir que se utilizará la imagen oficial de MySQL 8.4 Server.
- `ports` mapea el puerto del contenedor `3306` para poder acceder desde `localhost` usando `localhost:3306`.
- `enviroments` permite definir las variables a utilizar por el contenedor. Aquí se encuentran las credenciales y demás datos como el nombre de la base de datos.
- `volumes` define que se montará la carpeta `db_data` dentro del contenedor. Accesible internamente como `/var/lib/mysql`. Se define al final con la linea `volumes:` para indicar que Docker maneje automaticamente este volumen.
- `networks` define que el contenedor usará la red `devnet` que se detalla al final con `networks`.


<br><br>

## BackEnd

- `image` permite definir que se utilizará la imagen oficial de PHP 8.3.27 con Apache preinstalado. Esto ya incluye todo para servir archivos `.php` que se ubiquen dentro del contenedor en el path `/var/www/html`.
- `ports` vuelve a mapear el puerto del contenedor `80` para poder acceder desde `localhost` usando `localhost:9000`.
- `volumes` define que se montará la carpeta `/backend` dentro del contenedor accesible como `/var/www/html`.
- `networks` vuelve a definir que el contenedor usará la red `devnet` que se define al final.

<br><br>

## Network
Docker crea una red virtual ***interna*** donde todos los servicios se conectan. El tipo `bridge` es el estandar porque cada contenedor tiene su IP y nombre de host dentro de esa red.


