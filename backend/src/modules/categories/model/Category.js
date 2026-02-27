import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import logger from "#config/chalk.js";

class Category extends Model {}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: "Category", // Nombre del modelo
    tableName: "categories", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar timestamps automáticos
  },
);

logger.info("Modelo Category cargado correctamente.");

export default Category;
