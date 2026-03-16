class RoleBuilder {
  /**
   * @type {Object} role - Objeto que representa al rol en construcción
   */
  constructor() {
    this.role = {};
  }

  /**
   *
   * @param {string} name
   * @returns {RoleBuilder}
   */
  setName(name) {
    this.role.name = name;
    return this;
  }

  /**
   *
   * @param {string} description
   * @returns {RoleBuilder}
   */
  setDescription(description) {
    this.role.description = description;
    return this;
  }

  /**
   *
   * @param {string} created_at
   * @returns {RoleBuilder}
   */
  setCreatedAt(created_at) {
    this.role.created_at = created_at;
    return this;
  }

  /**
   *
   * @param {string} updated_at
   * @returns {RoleBuilder}
   */
  setUpdatedAt(updated_at) {
    this.role.updated_at = updated_at;
    return this;
  }

  /**
   *
   * @returns {Object} - El objeto de rol construido
   */
  build() {
    return this.role;
  }
}

export default RoleBuilder;
