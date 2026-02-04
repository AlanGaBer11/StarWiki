import { Sequelize } from "sequelize";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

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
          timestamps: true,
          underscored: true,
        },
      });
    } else {
      console.error(
        "El entorno de la base de datos no está configurado correctamente.",
      );
    }

    this.sequelize
      .authenticate()
      .then(() =>
        console.log(
          `Conexión a la base de datos desde ${process.env.NODE_ENV} exitosa.`,
        ),
      )
      .catch((error) =>
        console.error("No se pudo conectar a la base de datos:", error),
      );

    Database.instance = this;
  }

  getConnection() {
    return this.sequelize;
  }
}

const databaseInstance = new Database();

export default databaseInstance.getConnection();
