import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";
/* DTOs */
import PostDtoOutput from "../dto/output/post.dto.output.js";

class PostService {
  /**
   * @param {import ('../repository/post.repository.js').default} postRepository
   */

  constructor(postRepository) {
    /**
     * @type {import ('../repository/post.repository.js').default}
     */
    this.postRepository = postRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio inyectado
  static async create() {
    const repo = await RepositoryConfig.getRepository("post");
    return new PostService(repo);
  }

  // Método para obtener todos los posts
  async findAllPost(page, limit) {
    try {
      const result = await this.postRepository.findAll(page, limit);

      // Validar si se encontraron posts
      if (!result || result.posts.length === 0) {
        return { posts: [], totalPages: 0, totalPosts: 0, currentPage: 0 };
      }
      logger.info(`Se encontraron ${result.posts.length} posts.`);
      return {
        posts: result.posts.map((post) => new PostDtoOutput(post)),
        totalPosts: result.totalPosts,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      logger.error("Error al buscar posts:", error.message);
      throw error;
    }
  }
}

export default PostService;
