import { ValidationError } from "#shared/utils/errors.js";
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
    const parsedUserId = Number.parseInt(user_id);
    const parsedCategoryId = Number.parseInt(category_id);

    if (
      Number.isNaN(parsedUserId) ||
      Number.isNaN(parsedCategoryId) ||
      parsedUserId <= 0 ||
      parsedCategoryId <= 0
    ) {
      throw new ValidationError("Los IDs deben ser números enteros positivos.");
    }

    this.user_id = parsedUserId;
    this.category_id = parsedCategoryId;
    this.title = typeof title === "string" ? title.trim() : "";
    this.content = typeof content === "string" ? content.trim() : "";
    this.image_url = typeof image_url === "string" ? image_url.trim() : "";
  }
}

export default PostCreateDtoInput;
