class RoleUpdateDtoInput {
  /**
   * @param {Object} data
   * @param {Object} params
   * @param {number} params.role_id
   * @param {string} data.name
   * @param {string} data.description
   * @param {string} data.updated_at
   */
  constructor({ role_id, name, description, updated_at }) {
    const parseId = Number.parseInt(role_id);
    if (Number.isNaN(parseId) || parseId <= 0) {
      throw new Error("El ID de rol debe ser un número entero positivo.");
    }
    // Validar que al menos uno de los campos a actualizar esté presente
    if (
      (name === undefined || name === null) &&
      (description === undefined || description === null)
    ) {
      throw new Error("Debes enviar al menos un campo para actualizar");
    }

    this.role_id = role_id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at;
  }
}

export default RoleUpdateDtoInput;
