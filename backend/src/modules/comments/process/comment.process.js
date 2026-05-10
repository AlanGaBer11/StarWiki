import CommentService from "../services/comment.service.js";
import logger from "#config/chalk.js";

class CommentProcess {
  /**
   * @param {import("../services/comment.service.js").default} commentService
   */

  constructor(commentService) {
    this.commentService = commentService;
  }

  // Método estático para crear una instancia del proceso con el servicio adecuado
  static async create() {
    const service = await CommentService.create();
    return new CommentProcess(service);
  }

  // Método para obtener todos los comentarios
  async findAllComments(page, limit, query) {
    try {
      return await this.commentService.findAllComments(page, limit, query);
    } catch (error) {
      logger.error("Error en el proceso al buscar comentarios:", error.message);
      throw error;
    }
  }

  // Método para obtener un comentario por su ID
  async findCommentById(comment_id) {
    try {
      return await this.commentService.findCommentById(comment_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al buscar comentario por ID:",
        error.message,
      );
      throw error;
    }
  }
}

export default CommentProcess;
