import { DataTypes, Model } from "sequelize";
import sequelize from "#config/db.js";

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
    modelName: "Category", // Nombre del modelo
    tableName: "categories", // Nombre de la tabla en la base de datos
    timestamps: true, // Desactivar timestamps automáticos
    createdAt: "created_at", // Mapeo del campo created_at
    updatedAt: "updated_at", // Mapeo del campo updated_at
  },
);

console.log("Modelo Category cargado correctamente.");

export default Category;
