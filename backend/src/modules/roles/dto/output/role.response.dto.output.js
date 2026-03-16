class RoleResponseDtoOutput {
  /**
   * @param {Object} params
   * @param {boolean} params.success - Indica si la operación fue exitosa
   * @param {number} params.status - Código de estado HTTP
   * @param {string} params.message - Mensaje de respuesta
   * @param {Object|null} params.role - Rol individual (opcional)
   * @param {Array<Object>|null} params.roles - Lista de roles (opcional)
   * @param {number|null} params.page - Página actual (opcional)
   * @param {number|null} params.limit - Roles por página (opcional)
   * @param {number|null} params.totalRoles - Total de roles (opcional)
   * @param {Object|null} params.pagination - Objeto de paginación (opcional)
   */
  constructor({
    success,
    status,
    message,
    role = null,
    roles = null,
    page = null,
    limit = null,
    totalRoles = null,
    pagination = null,
  }) {
    this.success = success;
    this.status = status;
    this.message = message;
    if (role !== null) this.role = role;
    if (roles !== null) this.roles = roles;

    // Si se pasan datos de paginación, los calcula aquí
    if (page !== null && limit !== null && totalRoles !== null) {
      const totalPages = limit > 0 ? Math.ceil(totalRoles / limit) : 0;
      this.pagination = {
        currentPage: page,
        totalPages,
        totalRoles,
        rolesPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } else if (pagination !== null) {
      this.pagination = pagination;
    }
  }

  toJSON() {
    return {
      success: this.success,
      status: this.status,
      message: this.message,
      ...(this.pagination && { pagination: this.pagination }),
      ...(this.role && { role: this.role }),
      ...(this.roles && { roles: this.roles }),
    };
  }
}

export default RoleResponseDtoOutput;
