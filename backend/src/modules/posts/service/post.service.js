import RepositoryConfig from "#config/repository.js";
import logger from "#config/chalk.js";
import PostBuilder from "../builder/post.builder.js";
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

  // Método para buscar un post por su ID
  async findPostById(post_id) {
    try {
      const post = await this.postRepository.findById(post_id);

      // Validar si se encontró el post
      if (!post) return null;

      return new PostDtoOutput(post);
    } catch (error) {
      logger.error("Error al buscar el post:", error.message);
      throw error;
    }
  }

  // Método para crear un nuevo post
  async createPost(postData) {
    try {
      const { user_id, category_id, title, content, image_url } = postData;

      // Validar si el post ya existe
      const existingPost = await this.postRepository.findByTitle(title);
      if (existingPost) {
        throw new Error("El post ya existe.");
      }

      // Builder para crear el post
      const postBuilder = new PostBuilder()
        .setUserId(user_id)
        .setCategoryId(category_id)
        .setTitle(title)
        .setContent(content)
        .setImageUrl(image_url);

      // Construir el post
      const newPost = postBuilder.build();

      // Crear el post
      return await this.postRepository.create(newPost);
    } catch (error) {
      logger.error("Error al crear el post:", error.message);
      throw error;
    }
  }

  // Método para actualizar un post
  async updatePost(post_id, postData) {
    try {
      const { category_id, title, content, image_url } = postData;

      // Validar si se encontro el post
      const existingPost = await this.postRepository.findById(post_id);
      if (!existingPost) throw new Error("El post no existe.");

      // Validar si el titulo ya existe
      const existingTitle = await this.postRepository.findByTitle(title);
      if (existingTitle) throw new Error("El titulo ya existe.");

      // Builder para actualizar el posts
      const postBuilder = new PostBuilder()
        .setCategoryId(category_id)
        .setTitle(title)
        .setContent(content)
        .setImageUrl(image_url)
        .setUpdatedAt(new Date()); // Se actualiza la fecha de modificación

      const updatedPost = postBuilder.build();

      return await this.postRepository.update(post_id, updatedPost);
    } catch (error) {
      logger.error("Error al actualizar el post:", error.message);
      throw error;
    }
  }

  // Método para eliminar un post
  async deletePost(post_id) {
    try {
      // Validar si se encontro el post
      const existingPost = await this.postRepository.findById(post_id);
      if (!existingPost) throw new Error("El post no existe.");
      return await this.postRepository.delete(post_id);
    } catch (error) {
      logger.error("Error al eliminar el post:", error.message);
      throw error;
    }
  }

  // Método para cambiar el estado de un post
  async changePostStatus(post_id, status) {
    try {
      // Validar si se encontro el post
      const existingPost = await this.postRepository.findById(post_id);
      if (!existingPost) throw new Error("El post no existe.");

      // Validar si el estado es el mismo
      if (existingPost.status === status)
        throw new Error("El post ya tiene el estado solicitado.");
      return await this.postRepository.changeStatus(post_id, status);
    } catch (error) {
      logger.error("Error al cambiar el estado del post:", error.message);
      throw error;
    }
  }
}

export default PostService;
