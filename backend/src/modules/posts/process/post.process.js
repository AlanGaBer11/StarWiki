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
  async findAllPost(page, limit) {
    try {
      return await this.postService.findAllPost(page, limit);
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
}

export default PostProcess;
