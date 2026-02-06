import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/db.js";

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "role_id",
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255], // Mínimo 8 caracteres
      },
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:
        "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025_f2.png",
      validate: {
        isUrl: true,
      },
    },
    biography: {
      type: DataTypes.TEXT,
    },
    status: {
      type: "users_status", // Usa el tipo ENUM ya creado en la BD
      allowNull: false,
      defaultValue: "Activo",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "User", // Nombre del modelo,
    tableName: "users", // Nombre de la tabla en la base de datos
    timestamps: true, // Desactivar timestamps automáticos
    createdAt: "created_at", // Mapeo del campo created_at
    updatedAt: "updated_at", // Mapeo del campo updated_at
  },
);

console.log("Modelo User cargado correctamente.");

export default User;
