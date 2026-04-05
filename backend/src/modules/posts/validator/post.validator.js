import { check } from "express-validator";
import validateData from "#shared/utils/validateData.js";

class PostValidator {
  // Método para validar la entrada de datos al crear un nuevo post
  static createPostValidator = [
    check("user_id")
      .notEmpty()
      .withMessage("El ID del usuario es obligatorio.")
      .custom((value) => typeof value === "number")
      .withMessage("El ID del usuario debe ser un número, no una cadena de texto.")
      .isInt({ gt: 0 })
      .withMessage("El ID del usuario debe ser un número entero positivo."),

    check("category_id")
      .notEmpty()
      .withMessage("El ID de la categoría es obligatorio.")
      .custom((value) => typeof value === "number")
      .withMessage("El ID de la categoría debe ser un número, no una cadena de texto.")
      .isInt({ gt: 0 })
      .withMessage("El ID de la categoría debe ser un número entero positivo."),

    check("title")
      .notEmpty()
      .withMessage("El título es obligatorio.")
      .isString()
      .withMessage("El título debe ser una cadena de texto.")
      .isLength({ min: 1, max: 255 })
      .withMessage("El título debe tener entre 1 y 255 caracteres."),

    check("content")
      .notEmpty()
      .withMessage("El contenido es obligatorio.")
      .isString()
      .withMessage("El contenido debe ser una cadena de texto.")
      .isLength({ min: 1, max: 65535 })
      .withMessage("El contenido debe tener entre 1 y 65535 caracteres."),

    check("image_url")
      .notEmpty()
      .withMessage("La URL de la imagen es obligatoria.")
      .isString()
      .withMessage("La URL de la imagen debe ser una cadena de texto.")
      .isURL()
      .withMessage("La URL de la imagen debe ser una URL válida."),

    validateData,
  ];
}

export default PostValidator;
