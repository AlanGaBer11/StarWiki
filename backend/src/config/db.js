import { Sequelize } from "sequelize";
import logger from "#config/chalk.js";
class Database {
  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.sequelize = new Sequelize({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: "postgres",
        logging: false,
        define: {
          timestamps: false,
          underscored: true,
        },
      });
    } else {
      logger.error(
        "El entorno de la base de datos no está configurado correctamente.",
      );
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async initialize() {
    try {
      await this.sequelize.authenticate();
      logger.success(
        `Conexión a la base de datos desde ${process.env.NODE_ENV} exitosa.`,
      );
    } catch (error) {
      logger.error("No se pudo conectar a la base de datos:", error);
    }
  }

  getConnection() {
    return this.sequelize;
  }
}

const databaseInstance = Database.getInstance();
databaseInstance.initialize();

export default databaseInstance.getConnection();
