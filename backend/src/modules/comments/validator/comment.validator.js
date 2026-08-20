import { check } from "express-validator";
import validateData from "#shared/utils/validateData.js";

class CommentValidator {
  // Método para validar la entrada de datos al crear un nuevo comentario

  static createCommentValidator = [
    check("post_id")
      .notEmpty()
      .withMessage("El ID del post es obligatorio.")
      .isInt({ gt: 0 })
      .withMessage("El ID del post debe ser un número entero positivo."),
  ];
}
