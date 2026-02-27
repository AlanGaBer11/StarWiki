class RoleResponseDtoOutput {
  constructor({ success, status, message, role }) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.role = role;
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      role: this.role,
    };
  }
}

export { RoleResponseDtoOutput };
