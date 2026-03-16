class CategoryDtoOutput {
  /**
   * @param {Object} params
   * @param {number} params.category_id - ID de la categoría
   * @param {string} params.name - Nombre de la categoría
   * @param {string} params.description - Descripción de la categoría
   * @param {Date} params.created_at - Fecha de creación
   * @param {Date} params.updated_at - Fecha de actualización
   */
  constructor({ category_id, name, description, created_at, updated_at }) {
    this.category_id = category_id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default CategoryDtoOutput;
