# Usar la imagen oficial de Node.js basada en Alpine para un entorno ligero
FROM node:24-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm al contenedor
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]