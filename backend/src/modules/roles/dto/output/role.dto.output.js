class RoleDtoOutput {
  /**
   * @param {Object} params
   * @param {number} params.role_id - ID del rol
   * @param {string} params.name - Nombre del rol
   * @param {string} params.description - Descripción del rol
   * @param {Date} params.created_at - Fecha de creación del rol
   * @param {Date} params.updated_at - Fecha de última actualización del rol
   */
  constructor({ role_id, name, description, created_at, updated_at }) {
    this.role_id = role_id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      role_id: this.role_id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default RoleDtoOutput;
