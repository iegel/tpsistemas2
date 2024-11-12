# Etapa de construcción de la aplicación frontend
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación y la construye
COPY . .
RUN npm run build

# Imagen de NGINX para servir la aplicación frontend
FROM nginx:stable-alpine

# Copia los archivos de la build al directorio de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
