import { AppError } from "./errors.js";

// Función para manejar errores en los controladores
export function handleControllerError(error, res, ResponseDto, logger) {
  // Manejo centralizado de errores
  if (error instanceof AppError) {
    logger.warning(error.message);
    return res.status(error.statusCode).json(
      new ResponseDto({
        success: false,
        status: error.statusCode,
        message: error.message,
      }),
    );
  }
  // Manejo de errores inesperados
  logger.error("Error inesperado:", error.message);
  return res.status(500).json(
    new ResponseDto({
      success: false,
      status: 500,
      message: "Ocurrió un error inesperado.",
    }),
  );
}
