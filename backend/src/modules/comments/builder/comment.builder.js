class CommentBuilder {
  /**
   * @type {Object} coment - Objeto que representa el comentario
   */
  constructor() {
    this.comment = {};
  }

  /**
   *
   * @param {number} comment_id
   * @returns {CommentBuilder}
   */
  setCommentId(comment_id) {
    this.comment.comment_id = comment_id;
    return this;
  }

  /**
   *
   * @param {number} post_id
   * @returns {CommentBuilder}
   */
  setPostId(post_id) {
    this.comment.post_id = post_id;
    return this;
  }

  /**
   *
   * @param {number} user_id
   * @returns {CommentBuilder}
   */
  setUserId(user_id) {
    this.comment.user_id = user_id;
    return this;
  }

  /**
   *
   * @param {string} content
   * @returns {CommentBuilder}
   */
  setContent(content) {
    this.comment.content = content;
    return this;
  }

  /**
   *
   * @param {string} status
   * @returns {CommentBuilder}
   */
  setStatus(status) {
    this.comment.status = status;
    return this;
  }

  /**
   *
   * @param {Date} created_at
   * @returns {CommentBuilder}
   */
  setCreatedAt(created_at) {
    this.comment.created_at = created_at;
    return this;
  }

  /**
   *
   * @param {Date} updated_at
   * @returns {CommentBuilder}
   */
  setUpdatedAt(updated_at) {
    this.comment.updated_at = updated_at;
    return this;
  }

  /**
   *
   * @returns {Object} - Objeto que representa el comentario construido
   */
  build() {
    return this.comment;
  }
}
export default CommentBuilder;
