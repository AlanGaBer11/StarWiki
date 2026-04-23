import PostProcess from "../process/post.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
/* DTOs */
// Salida
import PostResponseDtoOutput from "../dto/output/post.response.dto.output.js";
// Entrada
import PostFindDtoInput from "../dto/input/post.find.dto.input.js";
import PostCreateDtoInput from "../dto/input/post.create.dto.input.js";
import PostUpdateDtoInput from "../dto/input/post.update.dto.input.js";
import PostChangeStatusDtoInput from "../dto/input/post.change_status.dto.input.js";

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

  // Método para manejar la solicitud de crear un nuevo post
  async createPost(req, res) {
    try {
      const dto = new PostCreateDtoInput(req.body);

      // Validaciones adicionales para el DTO
      if (
        !dto.user_id ||
        !dto.category_id ||
        !dto.title ||
        !dto.content ||
        !dto.image_url
      ) {
        logger.warning("Faltan datos requeridos para crear el post.");
        const response = new PostResponseDtoOutput({
          success: false,
          status: 400,
          message: "Todos los campos son requeridos.",
        });
        return res.status(400).json(response);
      }

      // Llamar al proceso para crear un nuevo post
      const newPost = await this.postProcess.createPost(dto);

      // Enviar la respuesta con el post creado
      logger.success("Post creado exitosamente.");
      const response = new PostResponseDtoOutput({
        success: true,
        status: 201,
        message: "Post creado exitosamente",
        post: newPost,
      });
      return res.status(201).json(response);
    } catch (error) {
      if (
        error.message?.includes("El post ya existe") ||
        error.message?.includes("números enteros positivos")
      ) {
        logger.warning(error.message);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error("Error en el controladoral crear el post:", error.message);
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al crear el post.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de actualizar un post
  async updatePost(req, res) {
    try {
      const dto = new PostUpdateDtoInput({ ...req.params, ...req.body });

      // Buscar el post para validar su existencia antes de intentar actualizarlo
      const existingPost = await this.postProcess.findPostById(dto.post_id);
      if (!existingPost) {
        logger.warning(`No se encontró el post con ID: ${dto.post_id}`);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el post con ID: ${dto.post_id}.`,
        });
        return res.status(404).json(response);
      }

      // Llamar al poroceso para actualizar el post
      const updatedPost = await this.postProcess.updatePost(dto.post_id, dto);

      // Enviar la respuesta con el post actualizado
      logger.success("Post actualizado exitosamente.");
      const response = new PostResponseDtoOutput({
        success: false,
        status: 200,
        message: "Post actualizado exitosamente.",
        post: updatedPost,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes("El titulo ya existe") ||
        error.message?.includes("número entero positivo") ||
        error.message?.includes("al menos un campo a actualizar")
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
        "Error en el controlador al actualizar el post:",
        error.message,
      );
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al actualizar el post.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de eliminar un post
  async deletePost(req, res) {
    try {
      const dto = new PostFindDtoInput(req.params);

      // Buscar el post para validar su existencia antes de intentar eliminarlo
      const existingPost = await this.postProcess.findPostById(dto.post_id);
      if (!existingPost) {
        logger.warning(`No se encontró el post con ID: ${dto.post_id}.`);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el post con ID: ${dto.post_id}.`,
        });
        return res.status(404).json(response);
      }

      // Llamar al proceso para eliminar el post
      await this.postProcess.deletePost(dto.post_id);

      // Enviar la respuesta de eliminación exitosa
      logger.success("Post eliminado exitosamente.");
      const response = new PostResponseDtoOutput({
        success: true,
        status: 200,
        message: "Post eliminado exitosamente.",
      });
      return res.status(200).json(response);
    } catch (error) {
      if (error.message?.includes("número entero positivo")) {
        logger.warning(error.message);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error(
        "Error en el controlador al eliminar el post:",
        error.message,
      );
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al eliminar el post.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de cambiar el estado de un post
  async changeStatusPost(req, res) {
    try {
      const dto = new PostChangeStatusDtoInput({ ...req.params, ...req.body });

      // Buscar el post para validar su existencia antes de intentar cambiar su estado
      const existingPost = await this.postProcess.findPostById(dto.post_id);
      if (!existingPost) {
        logger.warning(`No se encontró el post con ID: ${dto.post_id}.`);
        const response = new PostResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el post con ID: ${dto.post_id}.`,
        });
        return res.status(404).json(response);
      }

      // Llamar al proceso para cambiar el estado del post
      const updatedPost = await this.postProcess.changeStatusPost(
        dto.post_id,
        dto.status,
      );

      // Enviar la respuesta con el post actualizado
      logger.success("Estado del post cambiado exitosamente.");
      const response = new PostResponseDtoOutput({
        success: true,
        status: 200,
        message: "Estado del post cambiado exitosamente.",
        post: updatedPost,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes("número entero positivo") ||
        error.message?.includes("El status del post no es válido") ||
        error.message?.includes("ya tiene el estado solicitado.")
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
        "Error en el controlador al cambiar el estado del post:",
        error.message,
      );
      const response = new PostResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al cambiar el estado del post.",
      });
      return res.status(500).json(response);
    }
  }
}

export default PostController;
