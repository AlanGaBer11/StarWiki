class PostQueryDtoInput {
  /**
   *
   * @param {Object} query - Objeto con los parámetros de búsqueda (title, status)
   */
  constructor(query) {
    this.title = query.title;
    this.status = query.status;
  }
}
export default PostQueryDtoInput;
