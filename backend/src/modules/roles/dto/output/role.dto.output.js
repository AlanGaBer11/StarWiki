class RoleDtoOutput {
  constructor({ role_id, name, description, created_at, updated_at }) {
    this.role_id = role_id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      role_id: this.role_id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

class RoleResponseDtoOutput {
  constructor({ success, status, message, roles }) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.roles = roles;
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      roles: this.roles,
    };
  }
}

export { RoleDtoOutput, RoleResponseDtoOutput };
