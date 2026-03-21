class PostFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.post_id
   */

  constructor({ post_id }) {
    const parsedId = Number.parseInt(post_id);

    if (Number.isNaN(parsedId) || parsedId <= 0) {
      throw new Error("El ID del post debe ser un número entero positivo.");
    }
    this.post_id = parsedId;
  }
}

export default PostFindDtoInput;
