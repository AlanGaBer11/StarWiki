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
    const parseId = Number.parseInt(category_id);
    if (Number.isNaN(parseId) || parseId <= 0) {
      throw new ValidationError(
        "El ID de categoría debe ser un número entero positivo.",
      );
    }

    // Validar que al menos unos de los campos a actualizar esté presente
    if (
      (name === undefined || name === null) &&
      (description === undefined || description === null)
    ) {
      throw new ValidationError(
        "Debes enviar al menos un campo para actualizar.",
      );
    }

    this.category_id = parseId;
    this.name = name;
    this.description = description;
  }
}

export default CategoryUpdateDtoInput;
