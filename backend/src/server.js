import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { logger } from "#config/chalk.js"; // Importar el logger configurado con Chalk
import ApiRoutes from "./api/index.js"; // Importar la clase de rutas de la API

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

// Configurar las rutas de la API
const startServer = async () => {
  const apiRoutes = await ApiRoutes.create(); //
  app.use("/api/v3", apiRoutes.router);

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
};
startServer();
