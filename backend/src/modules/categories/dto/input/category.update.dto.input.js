import { parsePositiveInt } from "#shared/utils/parse.js";
import { ValidationError } from "#shared/utils/errors.js";

class CategoryUpdateDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.catgory_id
   *
   * @param {Object} data
   * @param {string} data.name
   * @param {string} data.description
   */

  constructor({ category_id, name, description, updated_at }) {
    // Validar que al menos unos de los campos a actualizar esté presente
    if (
      (name === undefined || name === null) &&
      (description === undefined || description === null)
    ) {
      throw new ValidationError(
        "Debes enviar al menos un campo para actualizar.",
      );
    }

    this.category_id = parsePositiveInt(category_id, "ID de la categoría");
    this.name = name;
    this.description = description;
  }
}

export default CategoryUpdateDtoInput;
