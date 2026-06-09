# StarWiki-App

Un blog moderno y responsive construido con tecnologías web de vanguardia. StarWiki permite a los usuarios crear, leer, actualizar y eliminar contenido de blog de manera sencilla, eficiente e intuitiva.

## 🚀 Características

- ✨ Interfaz de usuario moderna y responsive
- 📱 Compatible con dispositivos móviles y de escritorio
- 🔐 Sistema de autenticación y autorización
- 📝 Editor de contenido rico
- 🔍 Funcionalidad de búsqueda
- 💾 Almacenamiento persistente en PostgreSQL
- ⚡ API RESTful rápida y escalable

## 🏗️ Arquitectura

StarWiki utiliza una **arquitectura Cliente-Servidor** que separa claramente las responsabilidades entre el frontend y el backend:

```
┌─────────────────┐       HTTP/HTTPS       ┌─────────────────┐
│                 │ ────────────────────── │                 │
│   Frontend      │                        │    Backend      │
│ (Ionic + React) │ ←────────────────────→ │ (Node.js + API) │
│                 │      API RESTful       │                 │
└─────────────────┘                        └─────────────────┘
                                                     │
                                                     │ pg/Sequelize
                                                     ▼
                                            ┌─────────────────┐
                                            │   PostgreSQL    │
                                            │   (Database)    │
                                            └─────────────────┘
```

## 🛠️ Tecnologías

### [Backend](./backend/README.md "Documentación Backend")

- **Node.js**: Entorno de ejecución para JavaScript
- **Express.js**: Framework web minimalista y flexible
- **PostgreSQL**: Base de datos relacional de código abierto
- **Sequelize/pg**: ORM (Object-Relational Mapping) para PostgreSQL
- **API RESTful**: Arquitectura para servicios web

### [Frontend](./frontend/README.md "Documentación Frontend")

- **Ionic Framework**: Framework para aplicaciones móviles híbridas
- **React**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript**: Lenguaje de programación
- **CSS3**: Estilos y diseño responsive

## 📁 Estructura del Proyecto

```
StarWiki/
├── backend/
│   └── docs/                          # Documentación del backend
│   └── src/
│       ├── api/                       # Definición de rutas de la API
│       │   └── index.router.js        # Rutas principales
│       ├── config/                    # Configuración de la aplicación
│       ├── modules/                   # Módulos por dominio de negocio
│       │   ├── auth/                  # Autenticación y autorización
│       │   ├── categories/            # Gestión de categorías del blog
│       │   ├── comments/              # Sistema de comentarios
│       │   ├── posts/                 # Gestión de posts del blog
│       │   ├── roles/                 # Gestión de roles
│       │   └── users/                 # Gestión de usuarios
│       ├── shared/                    # Código compartido entre módulos
│       │   ├── email/                 # Gestión de correos electrónicos
│       │   ├── interfaces/            # Definición de contratos e interfaces de repositorios
│       │   ├── middlewares/           # Middlewares personalizados
│       │   ├── utils/                 # Utilidades y funciones auxiliares
│       └── server.js                  # Punto de entrada del servidor
├── frontend/
└── README.md
```

### 💡 Estructura Interna de Módulos

Cada módulo en `src/modules/` sigue una estructura consistente que promueve la separación de responsabilidades y facilita el mantenimiento:

```
modules/users/
├── builder/        # Patrón Builder
├── controller/     # Controladores del módulo
├── dto/            # Objetos de transferencia de datos
│   └── input/      # DTOs de entrada
│   └── output/     # DTOs de salida
├── model/          # Modelos del módulo
├── process/        # Procesos en segundo plano y tareas
├── repository/     # Implementaciones concretas de los repositorios
├── routes/         # Rutas del módulo
├── service/        # Lógica de negocio
└── validator/      # Validaciones específicas

```

**Descripción de cada carpeta:**

- **`builder/`**: Patron Builder para la creación de objetos
- **`controller/`**: Maneja las peticiones HTTP y coordina entre servicios
- **`dto/`**: Objetos de transferencia de datos
  - **`input/`**: DTOs para datos entrantes
  - **`output/`**: DTOs para datos salientes
- **`model/`**: Define las estructuras de datos y esquemas
- **`process/`**: Procesos en segundo plano y tareas independientes
- **`repository/`**: Implementaciones concretas de los repositorios para acceso a datos
- **`routes/`**: Define las rutas específicas del módulo
- **`service/`**: Contiene la lógica de negocio y reglas del dominio
- **`validator/`**: Validaciones específicas del módulo

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- pnpm
- Ionic CLI

### [Backend](./backend/README.md "Documentación Backend")

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura las variables de entorno:

   ```bash
   .env
   DB_HOST=localhost
   DB_PORT = 5432
   DB_NAME=starwiki_db
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   JWT_SECRET=yourjwtsecret

   # Edita .env con tu configuración de PostgreSQL
   ```

4. Inicia el servidor:
   ```bash
   pnpm start
   # o para desarrollo
   pnpm run dev
   ```

### [Frontend](./frontend/README.md "Documentación Frontend")

1. Navega al directorio del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Configura la URL de la API en el archivo de configuración

4. Inicia la aplicación:
   ```bash
   ionic serve
   ```

## 🔧 Scripts Disponibles

### Backend

- `pnpm start` - Inicia el servidor en producción
- `pnpm run dev` - Inicia el servidor en modo desarrollo
- `pnpm run lint` - Ejecuta el linter

### Frontend

- `ionic serve` - Inicia la aplicación en desarrollo
- `ionic build` - Construye la aplicación para producción
- `ionic capacitor run ios` - Ejecuta en iOS
- `ionic capacitor run android` - Ejecuta en Android

## 🌟 Características Futuras

- [ ] Sistema de comentarios
- [ ] Categorías y etiquetas
- [ ] Búsqueda avanzada
- [ ] Sistema de notificaciones
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Integración con redes sociales

## 👥 Autores

- **Alan Yahir García Bernal** - _Desarrollo inicial_ - [GitHub](https://github.com/AlanGaber11)

## Commit Convencionales

- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `refactor`: Refactorización del código
- `style`: Cambios en formato que no afectan el significado
- `docs`: Documentación
- `test`: Añadir pruebas o refactorizar pruebas
- `chore`: Tareas de mantenimiento
- `pref`: Optimización de código
- `build`: Compilación/Configuración
- `ci`: Integración continua (CI/CD)
- `revert`: Revertir cambios
