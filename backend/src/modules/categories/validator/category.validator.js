import { check } from "express-validator";
import validateData from "#shared/utils/validateData.js";

class CategoryValidator {
  // Método para validar los datos de entrada al crear una nueva categoría
  static createCategoryValidation = [
    check("name")
      .notEmpty()
      .withMessage("El nombre de la categoría es obligatoria.")
      .isLength({ min: 3, max: 100 })
      .withMessage(
        "El nombre de la categoría debe tener entre 3 y 100 caracteres.",
      )
      .isString()
      .withMessage("El nombre de la categoría debe ser una cadena de texto.")
      .matches(/^[a-zA-Z_\s]+$/)
      .withMessage(
        "El nombre de la categoría solo puede contener letras,guiones bajos y espacios.",
      )
      .trim(),

    check("description")
      .notEmpty()
      .withMessage("La descripción de la categoría es obligatoria.")
      .isLength({ min: 10, max: 255 })
      .withMessage(
        "La descripción de la categoría debe tener entre 10 y 255 caracteres.",
      )
      .isString()
      .withMessage(
        "La descripción de la categoría debe ser una cadena de texto.",
      )
      .trim(),

    validateData,
  ];

  // Método para validar los datos de entrada al actualizar una categoría existente
  static updateCategoryValidation = [
    check("category_id")
      .notEmpty()
      .withMessage("El ID de la categoría es obligatorio.")
      .isInt({ gt: 0 })
      .withMessage("El ID de la categoría debe ser un número entero positivo."),

    check("name")
      .optional()
      .notEmpty()
      .withMessage("El nombre de la categoría es obligatoria.")
      .isLength({ min: 3, max: 100 })
      .withMessage(
        "El nombre de la categoría debe tener entre 3 y 100 caracteres.",
      )
      .isString()
      .withMessage("El nombre de la categoría debe ser una cadena de texto.")
      .matches(/^[a-zA-Z_\s]+$/)
      .withMessage(
        "El nombre de la categoría solo puede contener letras,guiones bajos y espacios.",
      )
      .trim(),

    check("description")
      .optional()
      .notEmpty()
      .withMessage("La descripción de la categoría es obligatoria.")
      .isLength({ min: 10, max: 255 })
      .withMessage(
        "La descripción de la categoría debe tener entre 10 y 255 caracteres.",
      )
      .isString()
      .withMessage(
        "La descripción de la categoría debe ser una cadena de texto.",
      )
      .trim(),

    validateData,
  ];
}

export default CategoryValidator;
