import { parsePositiveInt } from "#shared/utils/parse.js";

import { ValidationError } from "#shared/utils/errors.js";
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
  }) {
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
      throw new ValidationError(
        "Debe proporcionar al menos un campo para actualizar.",
      );
    }

    this.user_id = parsePositiveInt(user_id, "El ID del usuario");
    this.role_id = parsePositiveInt(role_id, "El ID del rol");
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar_url = avatar_url;
    this.biography = biography;
  }
}

export default UserUpdateDtoInput;
