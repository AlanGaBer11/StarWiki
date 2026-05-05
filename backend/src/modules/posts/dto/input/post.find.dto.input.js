import { parsePositiveInt } from "#shared/utils/parse.js";
class PostFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.post_id
   */

  constructor({ post_id }) {
    this.post_id = parsePositiveInt(post_id, "ID del post");
  }
}

export default PostFindDtoInput;
