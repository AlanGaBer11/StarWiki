-- =============================================
-- 1. CONFIGURACIÓN INICIAL Y LIMPIEZA
-- =============================================
-- Crear la base de datos si no existe
CREATE DATABASE starwiki_db;
-- Conectarse a la base de datos
\c starwiki_db;


-- Limpiamos tablas previas en orden correcto (por las dependencias)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS user_verification CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TYPE IF EXISTS content_status CASCADE;
DROP TYPE IF EXISTS users_status CASCADE;
DROP FUNCTION IF EXISTS update_modified_column CASCADE;

-- =============================================
-- 2. TIPOS DE DATOS Y FUNCIONES
-- =============================================

-- Tipo ENUM para posts y comentarios
CREATE TYPE content_status AS ENUM ('Borrador', 'Publicado', 'Archivado');

-- Tipo ENUM para usuarios
CREATE TYPE users_status AS ENUM ('Activo', 'Inactivo', 'Suspendido', 'Eliminado');

-- Función para updated_at
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
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Categories Table */
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Users Table */
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025_f2.png',
    biography TEXT,
    status users_status NOT NULL DEFAULT 'Activo',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

/* User Verification Table (NUEVA) */
CREATE TABLE user_verification (
    verification_id SERIAL PRIMARY KEY,           
    user_id INT NOT NULL UNIQUE, -- UNIQUE para que un usuario solo tenga 1 código activo a la vez
    verified_code VARCHAR(6),                    
    expiration_code TIMESTAMP,                   
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- ON DELETE CASCADE: Si borras el user, se borra su verificación
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE 
);

/* Posts Table */
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    status content_status DEFAULT 'Borrador',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

/* Comments Table */
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    status content_status DEFAULT 'Borrador',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES posts(post_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
1
-- =============================================
-- 4. TRIGGERS
-- =============================================

CREATE TRIGGER update_roles_modtime BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_user_verification_modtime BEFORE UPDATE ON user_verification FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_posts_modtime BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_comments_modtime BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- =============================================
-- 5. ÍNDICES DE RENDIMIENTO
-- =============================================

-- USERS
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_status ON users(status); -- Útil para filtrar usuarios 'Activos' vs 'Eliminados'

-- USER VERIFICATION
CREATE INDEX idx_user_verification_code ON user_verification(verified_code);

-- POSTS
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status); 
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_title ON posts(title);

-- COMMENTS
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_user ON comments(user_id);


-- =============================================
-- 6. INSERTS DE PRUEBA (SEEDS BÁSICOS)
-- =============================================

-- Inserción de Roles
INSERT INTO roles (name, description) VALUES
('Admin', 'Administrador con acceso total al sistema'),
('Editor', 'Usuario con permisos para redactar y moderar contenido'),
('User', 'Usuario estándar que puede leer, publicar y comentar');

-- Inserción de Categorías
INSERT INTO categories (name, description) VALUES
('Guías', 'Artículos formativos, tutoriales y paso a paso'),
('Noticias', 'Actualizaciones y novedades del proyecto'),
('Comunidad', 'Discusiones generales y aportes de usuarios');

-- Inserción de Usuarios
-- (Nota: IDs asignados según el orden de inserción: 1, 2, 3)
INSERT INTO users (role_id, name, lastname, username, email, password, biography, status, verified) VALUES
(1, 'Alan', 'García', 'alanygb', 'alan@example.com', '$2b$10$wN3k9W0123456789abcdefghijklmnopqrstuvwxyz0123456789abc', 'Desarrollador full stack y creador de StarWiki.', 'Activo', TRUE),
(2, 'Carlos', 'Mendoza', 'cmendoza', 'carlos@example.com', '$2b$10$wN3k9W0123456789abcdefghijklmnopqrstuvwxyz0123456789abc', 'Editor de contenido técnico y redactor.', 'Activo', TRUE),
(3, 'Lucía', 'Fernández', 'lucia_f', 'lucia@example.com', '$2b$10$wN3k9W0123456789abcdefghijklmnopqrstuvwxyz0123456789abc', 'Entusiasta de la tecnología y lectora habitual.', 'Activo', FALSE);

-- Inserción de Verificación de Usuario
-- Código de 6 dígitos con expiración de 24 horas para el usuario no verificado (user_id = 3)
INSERT INTO user_verification (user_id, verified_code, expiration_code) VALUES
(3, '482910', NOW() + INTERVAL '24 hours');

-- Inserción de Posts
INSERT INTO posts (user_id, category_id, title, content, image_url, status) VALUES
(1, 2, 'Bienvenido a StarWiki', 'Este es el primer post oficial que marca el lanzamiento de la plataforma.', 'https://images.unsplash.com/photo-1518770660439-4636190af475', 'Publicado'),
(2, 1, 'Guía de inicio rápido para Docker', 'Aprende a configurar tu entorno de desarrollo utilizando contenedores y docker compose de forma sencilla.', 'https://images.unsplash.com/photo-1605745341112-85968b19335b', 'Publicado'),
(1, 3, 'Borrador: Roadmap 2026', 'Detalles sobre las próximas funcionalidades que implementaremos en la API y el cliente.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', 'Borrador');

-- Inserción de Comentarios
INSERT INTO comments (post_id, user_id, content, status) VALUES
(1, 2, '¡Excelente iniciativa! Quedó muy bien la estructura inicial.', 'Publicado'),
(1, 3, 'Felicidades por el lanzamiento, esperando más publicaciones.', 'Publicado'),
(2, 1, 'Gran resumen, muy útil para los nuevos integrantes.', 'Publicado');