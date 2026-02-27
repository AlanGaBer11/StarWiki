class RoleCreateDtoInput {
  /**
   * @param {Object} data
   * @param {string} data.name
   * @param {string} data.description
   */
  constructor({ name, description }) {
    this.name = typeof name === "string" ? name.trim() : "";
    this.description =
      typeof description === "string" ? description.trim() : "";
  }
}

export default RoleCreateDtoInput;
