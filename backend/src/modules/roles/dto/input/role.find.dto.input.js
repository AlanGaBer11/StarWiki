import { parsePositiveInt } from "#shared/utils/parse.js";
class RoleFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.role_id
   */
  constructor({ role_id }) {
    this.role_id = parsePositiveInt(role_id, "ID del rol");
  }
}
export default RoleFindDtoInput;
