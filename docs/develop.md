[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)

<h1>Develop</h1>
<h2>Tabla de contenidos</h2>

- [Frontend](#frontend)
- [Backend](#backend)

<br><br>

# Frontend
Dentro del path `/frontend`, ejecutar la siguiente secuencia de comandos:

```bash
npm install                                 # Instala las dependencias escritas en packaje.json
npm run dev -- --host 0.0.0.0 --port 80     # Sirve en la ip de la máquina, y en el puerto 80
```
Para hacer el build del proyecto y generar los archivos HTML y demás, se ejecuta:

```bash
npm run build
```


<br><br>

# Backend
Primero se deberá instalar [Docker](https://www.docker.com/). Luego, una vez todo instalado y configurado se utiliza (en la raiz del repositorio):

```bash
docker compose up -d    # Para levantar los contenedors
docker compose down     # Para detener los contenedores inicializados (agregando `-v` se eliminan los volumenes)
```
Si es la primera vez que se ejecuta el contenedor, se deberá crear las bases de datos básicas usando las instrucciones sql del archivo [/backend/SQL_structure.sql](/backend/SQL_structure.sql). Esto se puede hacer utilizando el software **MySQL Workbench** utilizando los datos de la base de datos local:

|    Campo    |     Valor      |
| :---------: | :------------: |
| **Usuario** |     `root`     |
|    Clave    | `rootpassword` |
|    Host     |  `localhost`   |
|   Puerto    |     `3306`     |

Y luego cargar el contenido del archivo nombrado.