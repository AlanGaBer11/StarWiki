import PostProcess from "../process/post.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
/* DTOs */
// Salida
import PostResponseDtoOutput from "../dto/output/post.response.dto.output.js";
// Entrada
import PostFindDtoInput from "../dto/input/post.find.dto.input.js";

class PostController {
  /**
   * @param {import('../processpost.process.js').default} postProcess
   */

  constructor(postProcess) {
    /**
     * @type {import('../process/post.process.js').default}
     */
    this.postProcess = postProcess;
  }
  // Método estático para crear una instancia del controlador con el proceso inyectado
  static async create() {
    const process = await PostProcess.create();
    return new PostController(process);
  }

  // Método para manejar la solicitud de buscar todos los posts
  async findAllPosts(req, res) {
    try {
      const { page, limit } = pagination(req.query);

      // Llamar al proceso para buscart todos los posts
      const result = await this.postProcess.findAllPost(page, limit);

      // Validar si se encontraron post
      if (!result.posts || result.posts.length === 0) {
        logger.warning("No se encontraron posts.");
        const response = new PostResponseDtoOutput({
          success: false,
          status: 404,
          message: "No se encontraron posts.",
          post: [],
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con los posts encontrados
      logger.success("Posts encontrados exitosamente.");
      const response = new PostResponseDtoOutput({
        success: true,
        status: 200,
        message: "Post encontrados exitosamente.",
        page,
        limit,
        totalPosts: result.totalPosts,
        posts: result.posts,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes(
          "Los parámetros de paginación deben ser números enteros positivos.",
        )
      ) {
        logger.warning("Error de validación de paginación:", error.message);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }

      logger.error("Error en el controlador al buscar posts:", error.message);
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar posts.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de buscar un post por su ID
  async findPostById(req, res) {
    try {
      const dto = new PostFindDtoInput(req.params);

      // Llamar al proceso para buscar el post
      const post = await this.postProcess.findPostById(dto.post_id);

      // Validar si se encontro el post
      if (!post) {
        logger.warning(`No se encontró el post con ID: ${dto.post_id}`);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el post con ID: ${dto.post_id}.`,
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con el post encontrado
      logger.success("Post encontrado exitosamente.");
      const response = new PostResponseDtoOutput({
        success: true,
        status: 200,
        message: "Post encontrado exitosamente.",
        post,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes(
          "El ID del post debe ser un número entero positivo.",
        )
      ) {
        logger.warning(error.message);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }

      logger.error(
        "Error en el controlador al buscar el post por ID:",
        error.message,
      );
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar el post por ID.",
      });
      return res.status(500).json(response);
    }
  }
}

export default PostController;
