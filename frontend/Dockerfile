# -> frontend/Dockerfile
FROM node:22-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Instalar dependencias de la aplicación
COPY package*.json ./
RUN npm install

# Vite como servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
