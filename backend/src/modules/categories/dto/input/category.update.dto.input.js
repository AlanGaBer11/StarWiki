class CategoryUpdateDtoInput {
  /**
   * @param {Object} data
   * @param {Object} params
   * @param {number} params.catgory_id
   * @param {string} data.name
   * @param {string} data.description
   * @param {Date} data.updated_at
   */

  constructor({ category_id, name, description, updated_at }) {
    const parseId = Number.parseInt(category_id);
    if (Number.isNaN(parseId) || parseId <= 0) {
      throw new Error("El ID de categoría debe ser un número entero positivo.");
    }

    // Validar que al menos unos de los campos a actualizar esté presente
    if (
      (name === undefined || name === null) &&
      (description === undefined || description === null)
    ) {
      throw new Error("Debes enviar al menos un campo para actualizar.");
    }

    this.category_id = category_id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at || new Date();
  }
}

export default CategoryUpdateDtoInput;
