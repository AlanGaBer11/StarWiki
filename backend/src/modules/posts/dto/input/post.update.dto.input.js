class PostUpdateDtoInput {
  /**
   * @param {Object} params
   * @param {number} params.post_id
   *
   * @param {Object} body
   * @param {number} body.category_id
   * @param {string} body.title
   * @param {string} body.content
   * @param {string} body.image_url
   */

  constructor({ post_id, category_id, title, content, image_url }) {
    const parsedPostId = Number.parseInt(post_id);

    // Validar que el ID del post sea un número entero positivo
    if (Number.isNaN(parsedPostId) || parsedPostId <= 0) {
      throw new Error("El ID del post debe ser un número entero positivo.");
    }

    // Validar que el ID de la categoría sea un número entero positivo
    const parsedCategoryId =
      category_id !== undefined ? Number.parseInt(category_id) : undefined;

    if (
      category_id !== undefined &&
      (Number.isNaN(parsedCategoryId) || parsedCategoryId <= 0)
    ) {
      throw new Error(
        "El ID de la categoría debe ser un número entero positivo.",
      );
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    if (
      [category_id, title, content, image_url].every(
        (value) => value === undefined || value === null,
      )
    ) {
      throw new Error("Debe proporcionar al menos un campo a actualizar.");
    }

    this.post_id = parsedPostId;
    this.category_id = parsedCategoryId; // Asignamos la variable parseada
    this.title = title;
    this.content = content;
    this.image_url = image_url;
  }
}

export default PostUpdateDtoInput;
