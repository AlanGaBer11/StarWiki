class UserBuilder {
  /**
   * @type {Object} user - Objeto que representa al usuario en construcción
   */
  constructor() {
    this.user = {};
  }

  /**
   *
   * @param {Number} role_id
   * @returns {UserBuilder}
   */
  setRoleId(role_id) {
    this.user.role_id = role_id;
    return this;
  }

  /**
   *
   * @param {string} name
   * @returns {UserBuilder}
   */
  setName(name) {
    this.user.name = name;
    return this;
  }

  /**
   *
   * @param {string} lastname
   * @returns {UserBuilder}
   */
  setLastname(lastname) {
    this.user.lastname = lastname;
    return this;
  }

  /**
   *
   * @param {string} username
   * @returns {UserBuilder}
   */
  setUsername(username) {
    this.user.username = username;
    return this;
  }

  /**
   *
   * @param {string} email
   * @returns {UserBuilder}
   */
  setEmail(email) {
    this.user.email = email;
    return this;
  }

  /**
   *
   * @param {string} password
   * @returns {UserBuilder}
   */
  setPassword(password) {
    this.user.password = password;
    return this;
  }

  /**
   *
   * @param {string} avatar_url
   * @returns {UserBuilder}
   */
  setAvatarUrl(avatar_url) {
    this.user.avatar_url = avatar_url;
    return this;
  }

  /**
   *
   * @param {string} biography
   * @returns {UserBuilder}
   */
  setBiography(biography) {
    this.user.biography = biography;
    return this;
  }

  /**
   *
   * @param {string} status
   * @returns {UserBuilder}
   */
  setStatus(status) {
    this.user.status = status;
    return this;
  }

  /**
   *
   * @param {boolean} verified
   * @returns {UserBuilder}
   */
  setVerified(verified) {
    this.user.verified = verified;
    return this;
  }

  /**
   *
   * @param {string} created_at
   * @returns {UserBuilder}
   */
  setCreatedAt(created_at) {
    this.user.created_at = created_at;
    return this;
  }

  /**
   *
   * @param {string} updated_at
   * @returns {UserBuilder}
   */
  setUpdatedAt(updated_at) {
    this.user.updated_at = updated_at;
    return this;
  }

  /**
   *
   * @returns {Object} - El objeto de usuario construido
   */
  build() {
    return this.user;
  }
}

export default UserBuilder;
