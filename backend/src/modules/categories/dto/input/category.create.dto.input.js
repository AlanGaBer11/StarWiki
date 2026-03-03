class CategoryCreateDtoInput {
  /**
   *
   * @param {Object} data
   * @param {string} data.name - El nombre de la categoría
   * @param {string} data.description - La descripción de la categoría
   */
  constructor({ name, description }) {
    this.name = typeof name === "string" ? name.trim() : name;
    this.description =
      typeof description === "string" ? description.trim() : description;
  }
}

export default CategoryCreateDtoInput;
