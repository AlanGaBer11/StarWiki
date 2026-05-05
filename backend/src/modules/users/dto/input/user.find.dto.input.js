import { parsePositiveInt } from "#shared/utils/parse.js";

class UserFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.user_id
   */

  constructor({ user_id }) {
    this.user_id = parsePositiveInt(user_id, "El ID del usuario");
  }
}

export default UserFindDtoInput;
