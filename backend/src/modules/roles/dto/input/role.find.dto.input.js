class RoleFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.role_id
a   */
  constructor({ role_id }) {
    this.role_id = Number.parseInt(role_id);
  }
}
export default RoleFindDtoInput;
