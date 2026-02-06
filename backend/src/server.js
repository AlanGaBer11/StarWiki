import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import sequelize from "#config/db.js";
import "#config/loadModels.js"; // Cargar los modelos de la base de datos
import "#config/associations.js"; // Cargar las asociaciones entre modelos

import { logger } from "#config/chalk.js";
// Sincronizar modelos con la base de datos
sequelize
  .sync({ alter: true }) // Usar alter: true para actualizar tablas sin perder datos ó usar force: true para recrear tablas (pérdida de datos)
  .then(() => {
    logger.success("Base de datos sincronizada correctamente.");
  })
  .catch((error) => {
    logger.error("Error al sincronizar la base de datos:", error);
  });

// Inicializar la aplicación
const app = express();

// Capa de seguridad
app.use(helmet());

const PORT = process.env.PORT || 3000;

// Límite de peticiones
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  limit: 100, // 100 peticiones por minuto
  message:
    "¡Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde!",
  standardHeaders: true,
  handler: (req, res) => {
    logger.warning(`Límite de peticiones alcanzado para al IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      status: 429,
      error:
        "¡Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde!",
    });
  },
});

// Aplicar el límite de peticiones
app.use(limiter);

// Aplicar CORS
app.use(cors());

// Parsear a JSON
app.use(bodyParser.json());

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de StarWiki, una wiki estelar para todos!");
});

// Ruta base
app.get("/api/v3", (req, res) => {
  res.send("API de StarWiki v3 - ¡Explora el universo con nosotros!");
});

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Rutas que no existen
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Ruta no encontrada",
    timestamp: new Date().toISOString(),
  });
});

// Inicializar el servidor
app.listen(PORT, () => {
  logger.success(`Servidor corriendo en http://localhost:${PORT}`);
});
