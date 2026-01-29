-- =============================================
-- 1. CONFIGURACIÓN INICIAL Y LIMPIEZA
-- =============================================

-- (Opcional) Si estás corriendo esto desde cero, descomenta las siguientes lineas:
-- DROP DATABASE IF EXISTS starwiki_db;
-- CREATE DATABASE starwiki_db;
-- \c starwiki_db;

-- Limpiamos tablas previas si existen para evitar errores al re-crear
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TYPE IF EXISTS content_status CASCADE;
DROP TYPE IF EXISTS user_status CASCADE;
DROP FUNCTION IF EXISTS update_modified_column CASCADE;

-- =============================================
-- 2. TIPOS DE DATOS Y FUNCIONES
-- =============================================

-- Tipo ENUM para manejar los estados de Posts y Comentarios
CREATE TYPE content_status AS ENUM ('Borrador', 'Publicado', 'Archivado');

-- Tipo ENUM para manejar los estados de los Usuarios
CREATE TYPE users_status AS ENUM ('Activo', 'Inactivo', 'Suspendido', 'Eliminado')


-- Función genérica para actualizar el campo 'updated_at' automáticamente
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 3. CREACIÓN DE TABLAS
-- =============================================

/* Roles Table */
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Índice automático
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Categories Table */
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Índice automático
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Users Table */
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE, -- Índice automático
    email VARCHAR(150) NOT NULL UNIQUE,    -- Índice automático
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025_f2.png',
    biography TEXT,
    status user_status DEFAULT 'Activo'
    verified BOOLEAN DEFAULT FALSE,
    verified_code VARCHAR(6),
    expiration_code TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

/* Posts Table */
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    status content_status DEFAULT 'Borrador', -- Usamos el ENUM creado arriba
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

/* Comments Table */
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    status content_status DEFAULT 'Borrador', -- Usamos el ENUM creado arriba
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES posts(post_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- =============================================
-- 4. TRIGGERS (Para updated_at)
-- =============================================

CREATE TRIGGER update_roles_modtime BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_posts_modtime BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_comments_modtime BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- =============================================
-- 5. ÍNDICES DE RENDIMIENTO (Performance)
-- =============================================

-- ÍNDICES PARA USERS
-- Indexamos role_id porque es Foreign Key
CREATE INDEX idx_users_role ON users(role_id);
-- Opcional: Para buscar usuarios por código de verificación rápidamente
CREATE INDEX idx_users_verified_code ON users(verified_code);

-- ÍNDICES PARA POSTS
-- Foreign Keys (CRÍTICO para JOINs)
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_category ON posts(category_id);
-- Filtros comunes
CREATE INDEX idx_posts_status ON posts(status); 
-- Ordenamiento (Feeds suelen ordenarse por fecha descendente)
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
-- Búsqueda básica por título
CREATE INDEX idx_posts_title ON posts(title);

-- ÍNDICES PARA COMMENTS
-- Foreign Keys (CRÍTICO: Un post carga sus comentarios via post_id)
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- Fin del script