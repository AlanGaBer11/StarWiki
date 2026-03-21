class PostResponseDtoOutput {
  /**
   * @param {Object} params
   * @param {boolean} params.success - Indica si la operación fue exitosa
   * @param {number} params.status - Código de estado HTTP
   * @param {string} params.message - Mensaje de respuesta
   * @param {Object | null} params.post - Post individual (opcional)
   * @param {Array<Object> | null} params.posts - Lista de posts (opcional)
   * @param {number|null} params.page - Página actual (opcional)
   * @param {number|null} params.limit - Usuario por página (opcional)
   * @param {number|null} params.totalPosts - Total de usuarios (opcional)
   * @param {Object|null} params.pagination - Objeto de paginación (opcional)
   */

  constructor({
    success,
    status,
    message,
    post = null,
    posts = null,
    page = null,
    limit = null,
    totalPosts = null,
    pagination = null,
  }) {
    this.success = success;
    this.status = status;
    this.message = message;
    if (post !== null) this.post = post;
    if (posts !== null) this.posts = posts;

    if (page !== null && limit !== null && totalPosts !== null) {
      const totalPages = limit > 0 ? Math.ceil(totalPosts / limit) : 0;
      this.pagination = {
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage: limit,
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
      ...(this.post && { post: this.post }),
      ...(this.posts && { posts: this.posts }),
    };
  }
}

export default PostResponseDtoOutput;
