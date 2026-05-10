class CommentQueryDtoInput {
  /**
   * @param {Object} query - Objeto con los parámetros de búsqueda (post_id, user_id, status)
   */
  constructor(query) {
    this.post_id = query.post_id;
    this.user_id = query.user_id;
    this.status = query.status;
  }
}

export default CommentQueryDtoInput;
