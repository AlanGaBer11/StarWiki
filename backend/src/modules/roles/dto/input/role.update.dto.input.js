import { ValidationError } from "#shared/utils/errors.js";

class RoleUpdateDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.role_id
   *
   * @param {Object} data
   * @param {string} data.name
   * @param {string} data.description
   */

  constructor({ role_id, name, description }) {
    const parseId = Number.parseInt(role_id);
    if (Number.isNaN(parseId) || parseId <= 0) {
      throw new ValidationError(
        "El ID de rol debe ser un número entero positivo.",
      );
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    if (
      (name === undefined || name === null) &&
      (description === undefined || description === null)
    ) {
      throw new ValidationError(
        "Debes enviar al menos un campo para actualizar",
      );
    }

    this.role_id = parseId;
    this.name = name;
    this.description = description;
  }
}

export default RoleUpdateDtoInput;
