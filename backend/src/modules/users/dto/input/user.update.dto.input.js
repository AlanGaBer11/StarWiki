class UserUpdateDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.user_id
   *
   * @param {Object} data
   * @param {number} data.role_id
   * @param {string} data.name
   * @param {string} data.lastname
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} data.password
   * @param {string} data.avatar_url
   * @param {string} data.biography
   * @param {Date} data.updated_at
   */

  constructor({
    user_id,
    role_id,
    name,
    lastname,
    username,
    email,
    password,
    avatar_url,
    biography,
    updated_at,
  }) {
    const parseUserId = Number.parseInt(user_id);
    if (Number.isNaN(parseUserId) || parseUserId <= 0) {
      throw new Error("El ID de usuario debe ser un número entero positivo.");
    }

    const parseRoleId =
      role_id !== undefined ? Number.parseInt(role_id) : undefined;
    if (
      role_id !== undefined &&
      (Number.isNaN(parseRoleId) || parseRoleId <= 0)
    ) {
      throw new Error("El ID de rol debe ser un número entero positivo.");
    }

    // Validar que al menos unos de los campos a actualizar esté presente
    if (
      [
        role_id,
        name,
        lastname,
        username,
        email,
        password,
        avatar_url,
        biography,
      ].every((value) => value === undefined || value === null)
    ) {
      throw new Error("Debe proporcionar al menos un campo para actualizar.");
    }

    this.user_id = parseUserId;
    this.role_id = parseRoleId;
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar_url = avatar_url;
    this.biography = biography;
    this.updated_at = updated_at || new Date();
  }
}

export default UserUpdateDtoInput;
