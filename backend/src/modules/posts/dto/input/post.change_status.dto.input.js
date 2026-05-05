import { parsePositiveInt } from "#shared/utils/parse.js";

import { ValidationError } from "#shared/utils/errors.js";
class PostChangeStatusDtoInput {
  /**
   *
   * @param {Object} param
   * @param {number} param.post_id - El ID del post a cambiar de estado
   *
   * @param {Object} body
   * @param {number} body.status - El nuevo estado del post (Borrador, Publicado, Archivado)
   */
  constructor({ post_id, status }) {
    // Validar que el status sea uno de los valores permitidos
    const validateStatus = ["Borrador", "Publicado", "Archivado"];
    if (!validateStatus.includes(status)) {
      throw new ValidationError("El status del post no es válido.");
    }

    this.post_id = parsePositiveInt(post_id, "ID del post");
    this.status = status;
  }
}

export default PostChangeStatusDtoInput;
