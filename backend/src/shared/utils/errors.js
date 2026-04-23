export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Establecer el nombre del error al nombre de la clase
    Error.captureStackTrace(this, this.constructor); // Capturar la pila de llamadas para el error
  }
}
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Datos de entrada no válidos") {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflicto de datos") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Error interno del servidor") {
    super(message, 500);
  }
}
