import PostService from "../service/post.service.js";
import logger from "#config/chalk.js";

class PostProcess {
  /**
   * @param {import ('../service/post.service.js').default} postService
   */

  constructor(postService) {
    /**
     * @param {import ('../service/post.service.js').default}
     */
    this.postService = postService;
  }

  // Método estático para crear una instancia del proceso con el servicio inyectado
  static async create() {
    const service = await PostService.create();
    return new PostProcess(service);
  }

  // Método para buscar todos los post
  async findAllPost(page, limit, query) {
    try {
      return await this.postService.findAllPost(page, limit, query);
    } catch (error) {
      logger.error("Error en el proceso al buscar posts:", error.message);
      throw error;
    }
  }

  // Método para buscar un post por su ID
  async findPostById(post_id) {
    try {
      return await this.postService.findPostById(post_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al buscar el post por ID:",
        error.message,
      );
      throw error;
    }
  }

  // Método para crear un nuevo post
  async createPost(postData) {
    try {
      return await this.postService.createPost(postData);
    } catch (error) {
      logger.error("Error en el proceso al crear el post:", error.message);
      throw error;
    }
  }

  // Método para actualizar un post
  async updatePost(post_id, postData) {
    try {
      return await this.postService.updatePost(post_id, postData);
    } catch (error) {
      logger.error("Error en el proceso al actualizar el post:", error.message);
      throw error;
    }
  }

  // Método para eliminar un post
  async deletePost(post_id) {
    try {
      return await this.postService.deletePost(post_id);
    } catch (error) {
      logger.error("Error en el proceso al eliminar el post:", error.message);
      throw error;
    }
  }

  // Método para cambiar el estado de un post
  async changePostStatus(post_id, status) {
    try {
      return await this.postService.changePostStatus(post_id, status);
    } catch (error) {
      logger.error(
        "Error en el proceso al cambiar el estado del post:",
        error.message,
      );
      throw error;
    }
  }
}

export default PostProcess;
