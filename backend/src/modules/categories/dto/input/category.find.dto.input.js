class CategoryFindDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.category_id
   */
  constructor({ category_id }) {
    const parsedId = Number.parseInt(category_id);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      throw new Error("El ID de categoría debe ser un número entero positivo.");
    }
    this.category_id = parsedId;
  }
}
export default CategoryFindDtoInput;
