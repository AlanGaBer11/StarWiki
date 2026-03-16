class UserFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.user_id
   */

  constructor({ user_id }) {
    const parsedId = Number.parseInt(user_id);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      throw new Error("El ID del usuario debe ser un número entero positivo.");
    }
    this.user_id = parsedId;
  }
}

export default UserFindDtoInput;
