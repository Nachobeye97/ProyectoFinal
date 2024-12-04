# Usa una imagen base de Node.js para la construcción
FROM node:18 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación construida
FROM nginx:alpine

# Copia los archivos construidos a la ubicación donde Nginx puede servirlos
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]