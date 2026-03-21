class UserDtoOutput {
  /**
   * @param {Object} params
   * @param {number} params.user_id - ID del usuario
   * @param {number} params.role_id - ID del rol
   * @param {string} params.name - Nombre
   * @param {string} params.lastname - Apellido
   * @param {string} params.username - Nombre de usuario
   * @param {string} params.email - Correo electrónico
   * @param {string} params.password - Contraseña
   * @param {string} params.avatar_url - URL del avatar
   * @param {string} params.biography - Biografía
   * @param {string} params.status - Estado
   * @param {boolean} params.verified - Verificado
   * @param {Date} params.created_at - Fecha de creación
   * @param {Date} params.updated_at - Fecha de actualización
   * @param {Date} params.deleted_at - Fecha de eliminación
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
    status,
    verified,
    created_at,
    updated_at,
    deleted_at,
  }) {
    this.user_id = user_id;
    this.role_id = role_id;
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar_url = avatar_url;
    this.biography = biography;
    this.status = status;
    this.verified = verified;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }

  toJSON() {
    return {
      user_id: this.user_id,
      role_id: this.role_id,
      name: this.name,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
      avatar_url: this.avatar_url,
      biography: this.biography,
      status: this.status,
      verified: this.verified,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
    };
  }
}
export default UserDtoOutput;
