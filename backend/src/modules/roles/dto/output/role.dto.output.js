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

export default RoleDtoOutput;
