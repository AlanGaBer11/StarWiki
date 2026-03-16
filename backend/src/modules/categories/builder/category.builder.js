class CategoryBuilder {
  /**
   * @type { Object} category - Objeto que representa a la categoría en construcción
   */
  constructor() {
    this.category = {};
  }

  /**
   *
   * @param {string} name
   * @returns {CategoryBuilder}
   */
  setName(name) {
    this.category.name = name;
    return this;
  }

  /**
   *
   * @param {string} description
   * @returns {CategoryBuilder}
   */
  setDescription(description) {
    this.category.description = description;
    return this;
  }

  /**
   *
   * @param {string} created_at
   * @returns {CategoryBuilder}
   */
  setCreatedAt(created_at) {
    this.category.created_at = created_at;
    return this;
  }

  /**
   *
   * @param {string} updated_at
   * @returns {CategoryBuilder}
   */
  setUpdatedAt(updated_at) {
    this.category.updated_at = updated_at;
    return this;
  }

  /**
   *
   * @returns {Object} - El objeto de categoría construido
   */
  build() {
    return this.category;
  }
}
export default CategoryBuilder;
