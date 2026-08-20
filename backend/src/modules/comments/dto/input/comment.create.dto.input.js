import { parsePositiveInt } from "#shared/utils/parse.js";

class CommentCreateDtoInput {
  /**
   * @param {Object} data
   * @param {number} data.post_id
   * @param {number} data.user_id
   * @param {string} data.content
   */

  constructor({ post_id, user_id, content }) {
    this.post_id = parsePositiveInt(post_id, "ID del post");
    this.userid = parsePositiveInt(user_id, "ID del usuario");
    this.content = typeof content === "string" ? content.trim() : "";
  }
}
export default CommentCreateDtoInput;
