import { parsePositiveInt } from "#shared/utils/parse.js";

class UserCreateDtoInput {
  /**
   * @param {Object} data
   * @param {number} data.role_id
   * @param {string} data.name
   * @param {string} data.lastname
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} data.password

   */

  constructor({ role_id, name, lastname, username, email, password }) {
    this.role_id = parsePositiveInt(role_id_id, "El ID del rol");
    this.name = typeof name === "string" ? name.trim() : "";
    this.lastname = typeof lastname === "string" ? lastname.trim() : "";
    this.username = typeof username === "string" ? username.trim() : "";
    this.email = typeof email === "string" ? email.trim() : "";
    this.password = typeof password === "string" ? password.trim() : "";
  }
}
export default UserCreateDtoInput;
