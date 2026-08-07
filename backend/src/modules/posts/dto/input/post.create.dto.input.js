import { parsePositiveInt } from "#shared/utils/parse.js";

class PostCreateDtoInput {
  /**
   * @param {Object} data
   * @param {number} data.user_id
   * @param {number} data.category_id
   * @param {string} data.title
   * @param {string} data.content
   * @param {string} data.image_url
   */

  constructor({ user_id, category_id, title, content, image_url }) {
    this.user_id = parsePositiveInt(user_id, "ID del usuario");
    this.category_id = parsePositiveInt(category_id, "ID de la categoría");
    this.title = typeof title === "string" ? title.trim() : "";
    this.content = typeof content === "string" ? content.trim() : "";
    this.image_url = typeof image_url === "string" ? image_url.trim() : "";
  }
}

export default PostCreateDtoInput;
