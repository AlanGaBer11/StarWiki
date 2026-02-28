class RoleFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.role_id
   */
  constructor({ role_id }) {
    const parsedId = Number.parseInt(role_id);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      throw new Error("El ID de rol debe ser un número entero positivo.");
    }
    this.role_id = parsedId;
  }
}
export default RoleFindDtoInput;
