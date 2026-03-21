class PostDtoOutput {
  /**
   * @param {Object} params
   * @param {number} params.post_id - ID del post
   * @param {number} params.user_id - ID del usuario
   * @param {number} params.category_id - ID de la categoría
   * @param {string} params.title - Título del post
   * @param {string} params.content - Contenido del post
   * @param {string} params.image_url - URL de la imagen
   * @param {string} params.status - Estado del post
   * @param {Date} params.created_at - Fecha de creación
   * @param {Date} params.updated_at - Fecha de actualización
   */
  constructor({
    post_id,
    user_id,
    category_id,
    title,
    content,
    image_url,
    status,
    created_at,
    updated_at,
  }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.category_id = category_id;
    this.title = title;
    this.content = content;
    this.image_url = image_url;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      post_id: this.post_id,
      user_id: this.user_id,
      category_id: this.category_id,
      title: this.title,
      content: this.content,
      image_url: this.image_url,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default PostDtoOutput;
