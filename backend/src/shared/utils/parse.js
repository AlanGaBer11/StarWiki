import { ValidationError } from "./errors.js";

export default function parseStringToBoolean(value) {
  if (typeof value === "string") {
    return value.toLocaleLowerCase() === "true";
  }
  return undefined;
}

export function parsePositiveInt(value, fieldName = "ID") {
  const parsed = Number.parseInt(value);

  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new ValidationError(
      `El ${fieldName} debe ser un número entero positivo.`,
    );
  }
  return parsed;
}
