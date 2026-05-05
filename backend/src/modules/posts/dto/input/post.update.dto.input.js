import { parsePositiveInt } from "#shared/utils/parse.js";

import { ValidationError } from "#shared/utils/errors.js";

class PostUpdateDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.post_id
   *
   * @param {Object} body
   * @param {number} body.category_id
   * @param {string} body.title
   * @param {string} body.content
   * @param {string} body.image_url
   */

  constructor({ post_id, category_id, title, content, image_url }) {
    // Validar que al menos uno de los campos a actualizar esté presente
    if (
      [category_id, title, content, image_url].every(
        (value) => value === undefined || value === null,
      )
    ) {
      throw new ValidationError(
        "Debe proporcionar al menos un campo a actualizar.",
      );
    }

    this.post_id = parsePositiveInt(post_id, "ID del post");
    this.category_id = parsePositiveInt(category_id, "ID de la categoría");
    this.title = title;
    this.content = content;
    this.image_url = image_url;
  }
}

export default PostUpdateDtoInput;
