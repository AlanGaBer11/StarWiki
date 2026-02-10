import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import { logger } from "#config/chalk.js";

class Comment extends Model {}

Comment.init(
  {
    ccomment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "post_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: "content_status", // Usa el tipo ENUM ya creado en la BD
      allowNull: false,
      defaultValue: "Borrador",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: "Comment", // Nombre del modelo,
    tableName: "comments", // Nombre de la tabla en la base de datos
    timestamps: true, // Desactivar timestamps automáticos
    createdAt: "created_at", // Mapeo del campo created_at
    updatedAt: "updated_at", // Mapeo del campo updated_at
  },
);

logger.info("Modelo Comment cargado correctamente.");

export default Comment;
