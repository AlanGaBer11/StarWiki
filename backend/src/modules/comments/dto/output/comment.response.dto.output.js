class CommentResponseDtoOutput {
  /**
   * @param {Object} params
   * @param {boolean} params.success - Indica si la operación fue exitosa
   * @param {number} params.status - Código de estado HTTP
   * @param {string} params.message - Mensaje de respuesta
   * @param {Object | null} params.comment - Comentario individual (opcional)
   * @param {Array<Object> | null} params.comments - Lista de Comentarios (opcional)
   * @param {number|null} params.page - Página actual (opcional)
   * @param {number|null} params.limit - Comentarios por página (opcional)
   * @param {number|null} params.totalComments - Total de comentarioss (opcional)
   * @param {Object|null} params.pagination - Objeto de paginación (opcional)
   */

  constructor({
    success,
    status,
    message,
    comment = null,
    comments = null,
    page = null,
    limit = null,
    totalComments = null,
    pagination = null,
  }) {
    this.success = success;
    this.status = status;
    this.message = message;
    if (comment !== null) this.comment = comment;
    if (comments !== null) this.comments = comments;
    if (page !== null && limit !== null && totalComments !== null) {
      const totalPages = limit > 0 ? Math.ceil(totalComments / limit) : 0;
      this.pagination = {
        currentPage: page,
        totalPages,
        totalComments,
        commentsPerPage: limit,
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
      ...(this.comment && { comment: this.comment }),
      ...(this.comments && { comments: this.comments }),
      ...(this.pagination && { pagination: this.pagination }),
    };
  }
}

export default CommentResponseDtoOutput;
