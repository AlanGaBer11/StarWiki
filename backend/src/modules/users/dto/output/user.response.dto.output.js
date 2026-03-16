class UserResponseDtoOutput {
  /**
   * @param {Object} params
   * @param {boolean} params.success - Indica si la operación fue exitosa
   * @param {number} params.status - Código de estado HTTP
   * @param {string} params.message - Mensaje de respuesta
   * @param {Object|null} params.user - Usuario individual (opcional)
   * @param {Array<Object>|null} params.users - Lista de usuarios (opcional)
   * @param {number|null} params.page - Página actual (opcional)
   * @param {number|null} params.limit - Usuarios por página (opcional)
   * @param {number|null} params.totalUsers - Total de usuarios (opcional)
   * @param {Object|null} params.pagination - Objeto de paginación (opcional)
   */
  constructor({
    success,
    status,
    message,
    user = null,
    users = null,
    page = null,
    limit = null,
    totalUsers = null,
    pagination = null,
  }) {
    this.success = success;
    this.status = status;
    this.message = message;
    if (user !== null) this.user = user;
    if (users !== null) this.users = users;

    // Si se pasan datos de paginación, los calcula aquí
    if (page !== null && limit !== null && totalUsers !== null) {
      const totalPages = limit > 0 ? Math.ceil(totalUsers / limit) : 0;
      this.pagination = {
        currentPage: page,
        totalPages,
        totalUsers,
        usersPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    } else if (pagination !== null) {
      this.pagination = pagination;
    }
  }

  toJSON() {
    return {
      succes: this.success,
      status: this.status,
      message: this.message,
      ...(this.pagination && { pagination: this.pagination }),
      ...(this.user && { user: this.user }),
      ...(this.users && { users: this.users }),
    };
  }
}

export default UserResponseDtoOutput;
