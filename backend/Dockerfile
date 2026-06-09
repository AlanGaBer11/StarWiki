# Usar la imagen oficial de Node.js basada en Alpine para un entorno ligero
FROM node:24-alpine

# Instalar pnpm globalmente en el contenedor usando Corepack (el estándar de Node)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración esenciales
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# CORRECCIÓN: Usamos la variable de configuración global de pnpm para permitir la construcción
RUN PNPM_CONFIG_ONLY_BUILT_DEPENDENCIES=sharp pnpm install --frozen-lockfile

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["pnpm", "run", "dev"]