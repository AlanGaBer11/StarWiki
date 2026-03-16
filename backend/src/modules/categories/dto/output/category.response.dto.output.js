class CategoryResponseDtOutput {
  /**
   * @param {Object} params
   * @param {boolean} params.success - Indica si la operación fue exitosa
   * @param {number} params.status - Código de estado HTTP
   * @param {string} params.message - Mensaje de respuesta
   * @param {Object|null} params.category - Categoría individual (opcional)
   * @param {Array<Object>|null} params.categories - Lista de categorías (opcional)
   * @param {number|null} params.page - Página actual (opcional)
   * @param {number|null} params.limit - Categorías por página (opcional)
   * @param {number|null} params.totalCategories - Total de categorías (opcional)
   * @param {Object|null} params.pagination - Objeto de paginación (opcional)
   */
  constructor({
    success,
    status,
    message,
    category = null,
    categories = null,
    page = null,
    limit = null,
    totalCategories = null,
    pagination = null,
  }) {
    this.success = success;
    this.status = status;
    this.message = message;
    if (category !== null) this.category = category;
    if (categories !== null) this.categories = categories;
    // Si se pasan datos de paginación, los calcula aquí
    if (page !== null && limit !== null && totalCategories !== null) {
      const totalPages = limit > 0 ? Math.ceil(totalCategories / limit) : 0;
      this.pagination = {
        currentPage: page,
        totalPages,
        totalCategories,
        categoriesPerPage: limit,
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
      ...(this.category && { category: this.category }),
      ...(this.categories && { categories: this.categories }),
    };
  }
}

export default CategoryResponseDtOutput;
