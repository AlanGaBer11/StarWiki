class UserSingleDtoOutput {
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
  }
  toJSON() {
    return {
      user_id: this.user_id,
      role_id: this.role_id,
      name: this.name,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      avatar_url: this.avatar_url,
      biography: this.biography,
      status: this.status,
      verified: this.verified,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default UserSingleDtoOutput;
