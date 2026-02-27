import { check } from "express-validator";
import validateData from "#shared/utils/validateData.js";

const createRoleValidation = [
  check("name")
    .notEmpty()
    .withMessage("El nombre del rol es obligatorio.")
    .isString()
    .withMessage("El nombre del rol debe ser una cadena de texto.")
    .matches(/^[a-zA-Z_\s]+$/)
    .withMessage(
      "El nombre del rol solo puede contener letras,guiones bajos y espacios.",
    )
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre del rol debe tener entre 3 y 50 caracteres.")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("La descripción del rol es obligatoria.")
    .isString()
    .withMessage("La descripción del rol debe ser una cadena de texto.")
    .isLength({ min: 10, max: 255 })
    .withMessage("La descripción del rol debe tener entre 10 y 255 caracteres.")
    .trim(),

  validateData,
];

export default createRoleValidation;
