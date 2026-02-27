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

class RolesResponseDtoOutput {
  constructor({
    success,
    status,
    message,
    page = 1,
    limit = 1,
    totalRoles = 0,
    roles = [],
  }) {
    const totalPages = limit > 0 ? Math.ceil(totalRoles / limit) : 0;

    this.success = success;
    this.status = status;
    this.message = message;
    this.pagination = success
      ? {
          currentPage: page,
          totalPages,
          totalRoles,
          rolesPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        }
      : null;
    this.roles = roles;
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      ...(this.pagination && { pagination: this.pagination }),
      roles: this.roles,
    };
  }
}

export { RoleDtoOutput, RolesResponseDtoOutput };
