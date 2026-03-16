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
    const parsedRoleId = Number.parseInt(role_id);
    if (Number.isNaN(parsedRoleId) || parsedRoleId <= 0) {
      throw new Error("El ID de rol debe ser un número entero positivo.");
    }

    this.role_id = parsedRoleId;
    this.name = typeof name === "string" ? name.trim() : "";
    this.lastname = typeof lastname === "string" ? lastname.trim() : "";
    this.username = typeof username === "string" ? username.trim() : "";
    this.email = typeof email === "string" ? email.trim() : "";
    this.password = typeof password === "string" ? password.trim() : "";
  }
}
export default UserCreateDtoInput;
