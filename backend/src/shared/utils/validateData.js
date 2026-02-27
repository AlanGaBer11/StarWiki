import { validationResult } from "express-validator";
import { logger } from "#config/chalk.js";

const validateData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warning("Error de validación");
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Error de validación",
      errors: errors.array(),
    });
  }
  next();
};

export default validateData;
