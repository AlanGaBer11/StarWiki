import { ValidationError } from "#shared/utils/errors.js";
class CategoryFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.category_id
   */
  constructor({ category_id }) {
    const parsedId = Number.parseInt(category_id);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      throw new ValidationError(
        "El ID de la categoría debe ser un número entero positivo.",
      );
    }
    this.category_id = parsedId;
  }
}
export default CategoryFindDtoInput;
