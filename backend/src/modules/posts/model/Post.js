import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";
import { logger } from "#config/chalk.js";

class Post extends Model {}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id",
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isUrl: true,
      },
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
    modelName: "Post", // Nombre del modelo,
    tableName: "posts", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar timestamps automáticos
  },
);

logger.info("Modelo Post cargado correctamente.");

export default Post;
