import { check } from "express-validator";
import validateData from "#shared/utils/validateData.js";

class UserValidator {
  // Metódo para validar la entrada de datos al crear un nuevo usuario
  static createUserValidation = [
    check("role_id")
      .notEmpty()
      .withMessage("El ID del rol es obligatorio.")
      .isInt({ gt: 0 })
      .withMessage("El ID del rol debe ser un número entero positivo.")
      .isNumeric()
      .withMessage("El ID del rol debe ser un valor numérico."),

    check("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio.")
      .isLength({ min: 2, max: 50 })
      .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
      .isString()
      .withMessage("El nombre debe ser una cadena de texto.")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .withMessage("El nombre solo puede contener letras y espacios.")
      .trim(),

    check("lastname")
      .notEmpty()
      .withMessage("El apellido es obligatorio.")
      .isLength({ min: 2, max: 50 })
      .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
      .isString()
      .withMessage("El apellido debe ser una cadena de texto.")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .withMessage("El apellido solo puede contener letras y espacios.")
      .trim(),

    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio.")
      .isLength({ min: 3, max: 30 })
      .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres.")
      .isString()
      .withMessage("El nombre de usuario debe ser una cadena de texto.")
      .matches(/^\w+$/)
      .withMessage(
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      )
      .trim()
      .toLowerCase(),

    check("email")
      .notEmpty()
      .withMessage("El correo electrónico es obligatorio.")
      .isEmail()
      .withMessage("El correo electrónico no es válido.")
      .normalizeEmail()
      .trim(),

    check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria.")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres.")
      .matches(/[A-Z]/)
      .withMessage("La contraseña debe contener al menos una letra mayúscula.")
      .matches(/[a-z]/)
      .withMessage("La contraseña debe contener al menos una letra minúscula.")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("La contraseña debe contener al menos un carácter especial")
      .trim(),

    validateData,
  ];

  // Metódo para validar la entrada de datos al actualizar un usuario
  static updateUserValidation = [
    check("role_id")
      .optional()
      .notEmpty()
      .withMessage("El ID del rol es obligatorio.")
      .isInt({ gt: 0 })
      .withMessage("El ID del rol debe ser un número entero positivo.")
      .isNumeric()
      .withMessage("El ID del rol debe ser un valor numérico."),

    check("name")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio.")
      .isLength({ min: 2, max: 50 })
      .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
      .isString()
      .withMessage("El nombre debe ser una cadena de texto.")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .withMessage("El nombre solo puede contener letras y espacios.")
      .trim(),

    check("lastname")
      .optional()
      .notEmpty()
      .withMessage("El apellido es obligatorio.")
      .isLength({ min: 2, max: 50 })
      .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
      .isString()
      .withMessage("El apellido debe ser una cadena de texto.")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .withMessage("El apellido solo puede contener letras y espacios.")
      .trim(),

    check("username")
      .optional()
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio.")
      .isLength({ min: 3, max: 30 })
      .withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres.")
      .isString()
      .withMessage("El nombre de usuario debe ser una cadena de texto.")
      .matches(/^\w+$/)
      .withMessage(
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      )
      .trim()
      .toLowerCase(),

    check("email")
      .optional()
      .notEmpty()
      .withMessage("El correo electrónico es obligatorio.")
      .isEmail()
      .withMessage("El correo electrónico no es válido.")
      .normalizeEmail()
      .trim(),

    check("password")
      .optional()
      .notEmpty()
      .withMessage("La contraseña es obligatoria.")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres.")
      .matches(/[A-Z]/)
      .withMessage("La contraseña debe contener al menos una letra mayúscula.")
      .matches(/[a-z]/)
      .withMessage("La contraseña debe contener al menos una letra minúscula.")
      .matches(/[^A-Za-z0-9]/)
      .withMessage("La contraseña debe contener al menos un carácter especial")
      .trim(),

    check("avatar_url")
      .optional()
      .isURL()
      .withMessage("La URL del avatar no es válida.")
      .trim(),

    check("biography")
      .optional()
      .isLength({ max: 500 })
      .withMessage("La biografía no puede tener más de 500 caracteres.")
      .isString()
      .withMessage("La biografía debe ser una cadena de texto.")
      .trim(),

    validateData,
  ];
}

export default UserValidator;
