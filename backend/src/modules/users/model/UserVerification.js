import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import { logger } from "#config/chalk.js";

class UserVerification extends Model {}

UserVerification.init(
  {
    verification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Un usuario solo puede tener un código de verificación activo
      references: {
        model: "users",
        key: "user_id",
      },
    },
    verified_code: {
      type: DataTypes.STRING(6),
    },
    expiration_code: {
      type: DataTypes.DATE,
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
    modelName: "UserVerification", // Nombre del modelo,
    tableName: "user_verification", // Nombre de la tabla en la base de datos
    timestamps: true, // Desactivar timestamps automáticos
    createdAt: "created_at", // Mapeo del campo created_at
    updatedAt: "updated_at", // Mapeo del campo updated_at
  },
);

logger.info("Modelo UserVerification cargado correctamente.");

export default UserVerification;
