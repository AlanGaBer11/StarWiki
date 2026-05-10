import { parsePositiveInt } from "#shared/utils/parse.js";

class CommentFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} param.comment_id - ID del comentario a buscar
   */
  constructor({ comment_id }) {
    this.comment_id = parsePositiveInt(comment_id, "ID del comentario");
  }
}

export default CommentFindDtoInput;
