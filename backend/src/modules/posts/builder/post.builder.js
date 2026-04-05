class PostBuilder {
  /**
   * @type {Object} post - Objeto que representa el post
   */

  constructor() {
    this.post = {};
  }

  /**
   * @param {number} post_id
   * @returns {PostBuilder}
   */
  setPostId(post_id) {
    this.post.post_id = post_id;
    return this;
  }

  /**
   * @param {number} user_id
   * @returns {PostBuilder}
   */
  setUserId(user_id) {
    this.post.user_id = user_id;
    return this;
  }

  /**
   * @param {number} category_id
   * @returns {PostBuilder}
   */
  setCategoryId(category_id) {
    this.post.category_id = category_id;
    return this;
  }

  /**
   * @param {string} title
   * @returns {PostBuilder}
   */
  setTitle(title) {
    this.post.title = title;
    return this;
  }

  /**
   * @param {string} content
   * @returns {PostBuilder}
   */
  setContent(content) {
    this.post.content = content;
    return this;
  }

  /**
   * @param {string} image_url
   * @returns {PostBuilder}
   */
  setImageUrl(image_url) {
    this.post.image_url = image_url;
    return this;
  }

  /**
   * @param {string} status
   * @returns {PostBuilder}
   */
  setStatus(status) {
    this.post.status = status;
    return this;
  }

  /**
   * @param {Date} created_at
   * @returns {PostBuilder}
   */
  setCreatedAt(created_at) {
    this.post.created_at = created_at;
    return this;
  }

  /**
   * @param {Date} updated_at
   * @returns {PostBuilder}
   */
  setUpdatedAt(updated_at) {
    this.post.updated_at = updated_at;
    return this;
  }

  /**
   * @returns {Object} - Objeto que representa el post
   */
  build() {
    return this.post;
  }
}
export default PostBuilder;
