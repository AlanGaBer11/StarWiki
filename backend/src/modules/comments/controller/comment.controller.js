import CommentProcess from "../process/comment.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
import { AppError } from "#shared/utils/errors.js";

/* DTOs */
// Salida
import CommentResponseDtoOutput from "../dto/output/comment.response.dto.output.js";
// Entrada

class CommentController {
  /**
   * @param {import("../process/comment.process.js").default} commentProcess
   */

  constructor(commentProcess) {
    this.commentProcess = commentProcess;
  }

  // Método estático para crear una instancia del controlador con el proceso adecuado
  static async create() {
    const process = await CommentProcess.create();
    return new CommentController(process);
  }

  // Método para manejar la solicitud de buscar todos los comentarios
  async findAllComments(req, res) {
    try {
      const { page, limit } = pagination(req.query);

      // Llamar al proceso para buscar todos los comentarios
      const result = await this.commentProcess.findAllComments(
        page,
        limit,
        req.query,
      );

      // Validar si se encontraron comentarios
      if (!result.comments || result.comments.length === 0) {
        logger.warning("No se encontraron comentarios.");
        return res.status(404).json(
          new CommentResponseDtoOutput({
            success: false,
            status: 404,
            message: "No se encontrtaron comentarios en está página.",
            comments: [],
          }),
        );
      }

      // Enviar la respuesta con los comentarios encontrados
      logger.success("Comentarios encontrados exitosamente.");
      return res.status(200).json(
        new CommentResponseDtoOutput({
          success: true,
          status: 200,
          message: "Comentarios encontrados exitosamente.",
          page,
          limit,
          totalComments: result.totalComments,
          comments: result.comments,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CommentResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error ", error.message);
      return res.status(500).json(
        new CommentResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }
}

export default CommentController;
