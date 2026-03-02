class CategoryResponseDtOutput {
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
