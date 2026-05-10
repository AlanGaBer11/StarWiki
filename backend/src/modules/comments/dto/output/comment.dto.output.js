class CommentDtoOutput {
  /**
   * @param {Object} params
   * @param {number} params.comment_id - ID del comentario
   * @param {number} params.post_id - ID del post
   * @param {number} params.user_id - ID del usuario
   * @param {string} params.content - Contenido del comentario
   * @param {string} params.status - Estado del comentario
   * @param {Date} params.created_at - Fecha de creación
   * @param {Date} params.updated_at - Fecha de actualización
   */

  constructor({
    comment_id,
    post_id,
    user_id,
    content,
    status,
    created_at,
    updated_at,
  }) {
    this.comment_id = comment_id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.content = content;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      comment_id: this.comment_id,
      post_id: this.post_id,
      user_id: this.user_id,
      content: this.content,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
export default CommentDtoOutput;
