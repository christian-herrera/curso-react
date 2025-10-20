[![Static Badge](https://img.shields.io/badge/volver-blue?style=for-the-badge)](https://github.com/christian-herrera/curso-react)

<h1>Notas</h1>
<h2>Tabla de contenidos</h2>

- [Componentes a Instalar](#componentes-a-instalar)
- [Luego de Clonar el Repositorio](#luego-de-clonar-el-repositorio)

<br><br>


# Componentes a Instalar

```bash
npm install bootstrap
npm install react-router-d
npm install framer-motion
```

<br><br>

# Luego de Clonar el Repositorio
Ejecutar:
```bash
npm install
```
Para instalar todos los paquetes presentes del archivo `package.json`.

Luego, para hacer el debug, utilizar:
```bash
npm run dev -- --host 0.0.0.0 --port 80
```
Para servir directamente la app en la ip de la pc, especificamente en el puerto `80`.

Finalmente, para hacer el deploy, se utiliza GitHub Pages. El build y la subida se realiza con:
```bash
npm run deploy
```
Solicitará varias veces el uso de la YubiKey para lograr subir al repositorio y que GitHub sirva el proyecto en la url: `curso-react.christianherrera.com.ar`.