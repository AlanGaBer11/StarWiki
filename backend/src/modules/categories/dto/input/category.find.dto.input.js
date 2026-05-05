import { parsePositiveInt } from "#shared/utils/parse.js";
class CategoryFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.category_id
   */
  constructor({ category_id }) {
    this.category_id = parsePositiveInt(category_id, "ID de la categoría");
  }
}
export default CategoryFindDtoInput;
