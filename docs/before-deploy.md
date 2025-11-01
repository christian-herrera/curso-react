[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)

<h1>Deploy</h1>
<h2>Tabla de contenidos</h2>

- [Revisiones Previas al Deploy](#revisiones-previas-al-deploy)
- [Revisiones Previas al Push en GitHub](#revisiones-previas-al-push-en-github)

<br><br>

# Revisiones Previas al Deploy

> [!IMPORTANT] FrontEnd
> ✔️ Configurar en el archivo `.env` las variables de producción.
> <br>✔️ 

> [!IMPORTANT] BackEnd
> ✔️ Configurar el archivo `config.php` con las variables de producción.
> <br>✔️ Verificar que el CORS no rechaza las peticiones provenientes del frontend (si se utiliza dominios distintos para el frontend y el backend).
> <br>✔️ 

En este momento, se podrá ejecutar:
```bash
npm run deploy
```


<br><br>

# Revisiones Previas al Push en GitHub
> [!IMPORTANT] BackEnd
> ✔️ Cifrar los archivos con variables de produccion usando el script `cipher_prod.ps1`. Esto crea las versiones cifradas.
> <br>✔️ Restaurar los archivos `/backend/config.php` y `/frontend/.env` con las variables propias de Docker.
> <br>✔️ Si se sirven imagenes, cambiar las url que devuelve el backend para servirlas localmente.
> <br>✔️ Configurar la `"version"` en el archivo `package.json`.
> <br>✔️ Configurar el `README.md` y los archivos de documentación asociados.



En este momento, se podrá ejecutar la secuencia: ***`git add`***, ***`git commit`*** y ***`git push`***




