# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto especificado en el archivo .env (en este caso, 3001)
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]
