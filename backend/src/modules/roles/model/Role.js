import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import logger from "#config/chalk.js";

class Role extends Model {}

Role.init(
  {
    role_id: {
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
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: "Role", // Nombre del modelo
    tableName: "roles", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar timestamps automáticos
  },
);

logger.info("Modelo Role cargado correctamente.");

export default Role;
