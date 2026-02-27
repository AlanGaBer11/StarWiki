import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import logger from "#config/chalk.js";

class Comment extends Model {}

Comment.init(
  {
    comment_id: {
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
      type: DataTypes.ENUM("Borrador", "Publicado", "Archivado"),
      allowNull: false,
      defaultValue: "Borrador",
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
    modelName: "Comment", // Nombre del modelo,
    tableName: "comments", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar timestamps automáticos
  },
);

logger.info("Modelo Comment cargado correctamente.");

export default Comment;
