class RoleBuilder {
  constructor() {
    this.role = {};
  }

  setName(name) {
    this.role.name = name;
    return this;
  }

  setDescription(description) {
    this.role.description = description;
    return this;
  }
  setCreatedAt(created_at) {
    this.role.created_at = created_at;
    return this;
  }
  setUpdatedAt(updated_at) {
    this.role.updated_at = updated_at;
    return this;
  }

  build() {
    return this.role;
  }
}

export default RoleBuilder;
