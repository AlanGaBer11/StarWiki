import PostProcess from "../process/post.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
import { AppError } from "#shared/utils/errors.js";
/* DTOs */
// Salida
import PostResponseDtoOutput from "../dto/output/post.response.dto.output.js";
// Entrada
import PostQueryDtoInput from "../dto/input/post.query.dto.input.js";
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
      const queryDto = new PostQueryDtoInput(req.query);

      // Llamar al proceso para buscart todos los posts
      const result = await this.postProcess.findAllPost(page, limit, queryDto);

      // Validar si se encontraron post
      if (!result.posts || result.posts.length === 0) {
        logger.warning("No se encontraron posts.");
        return res.status(404).json(
          new PostResponseDtoOutput({
            success: false,
            status: 404,
            message: "No se encontraron posts.",
            post: [],
          }),
        );
      }

      // Enviar la respuesta con los posts encontrados
      logger.success("Posts encontrados exitosamente.");
      return res.status(200).json(
        new PostResponseDtoOutput({
          success: true,
          status: 200,
          message: "Post encontrados exitosamente.",
          page,
          limit,
          totalPosts: result.totalPosts,
          posts: result.posts,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de buscar un post por su ID
  async findPostById(req, res) {
    try {
      const findDto = new PostFindDtoInput(req.params);

      // Llamar al proceso para buscar el post
      const post = await this.postProcess.findPostById(findDto.post_id);

      // Enviar la respuesta con el post encontrado
      logger.success("Post encontrado exitosamente.");
      return res.status(200).json(
        new PostResponseDtoOutput({
          success: true,
          status: 200,
          message: "Post encontrado exitosamente.",
          post,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de crear un nuevo post
  async createPost(req, res) {
    try {
      const createDto = new PostCreateDtoInput(req.body);
      // Llamar al proceso para crear un nuevo post
      const newPost = await this.postProcess.createPost(createDto);

      // Enviar la respuesta con el post creado
      logger.success("Post creado exitosamente.");
      return res.status(201).json(
        new PostResponseDtoOutput({
          success: true,
          status: 201,
          message: "Post creado exitosamente",
          post: newPost,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de actualizar un post
  async updatePost(req, res) {
    try {
      const updateDto = new PostUpdateDtoInput({ ...req.params, ...req.body });
      // Llamar al poroceso para actualizar el post
      const updatedPost = await this.postProcess.updatePost(
        updateDto.post_id,
        updateDto,
      );

      // Enviar la respuesta con el post actualizado
      logger.success("Post actualizado exitosamente.");
      return res.status(200).json(
        new PostResponseDtoOutput({
          success: true,
          status: 200,
          message: "Post actualizado exitosamente.",
          post: updatedPost,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de eliminar un post
  async deletePost(req, res) {
    try {
      const findDto = new PostFindDtoInput(req.params);

      // Llamar al proceso para eliminar el post
      await this.postProcess.deletePost(findDto.post_id);

      // Enviar la respuesta de eliminación exitosa
      logger.success("Post eliminado exitosamente.");
      return res.status(200).json(
        new PostResponseDtoOutput({
          success: true,
          status: 200,
          message: "Post eliminado exitosamente.",
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de cambiar el estado de un post
  async changePostStatus(req, res) {
    try {
      const findDto = new PostChangeStatusDtoInput({
        ...req.params,
        ...req.body,
      });

      // Llamar al proceso para cambiar el estado del post
      const updatedPost = await this.postProcess.changePostStatus(
        findDto.post_id,
        findDto.status,
      );

      // Enviar la respuesta con el post actualizado
      logger.success("Estado del post cambiado exitosamente.");
      return res.status(200).json(
        new PostResponseDtoOutput({
          success: true,
          status: 200,
          message: "Estado del post cambiado exitosamente.",
          post: updatedPost,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new PostResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new PostResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }
}

export default PostController;
