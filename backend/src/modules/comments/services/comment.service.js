import RepositoryConfig from "#config/repository.js";
import logger from "#config/chalk.js";

/* DTOs */
import CommentDtoOutput from "../dto/output/comment.dto.output.js";

/* Errores */

class CommentService {
  /**
   * @param {import("../repository/comment.repository.js").default} commentRepository
   */
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio adecuado
  static async create() {
    const repo = await RepositoryConfig.getRepository("comment");
    return new CommentService(repo);
  }

  // Método para obtener todos los comentarios
  async findAllComments(page, limit, query) {
    try {
      const result = await this.commentRepository.findAll(page, limit, query);

      // Si no se encontraron comentarios, retornar un objeto con valores predeterminados
      if (!result || result.comments.length === 0) {
        return {
          comments: [],
          totalComments: 0,
          totalPages: 0,
          currentPage: 0,
        };
      }

      // Registrar la cantidad de comentarios encontrados
      logger.info(`Se encontraron ${result.comments.length} comentarios.`);
      return {
        comments: result.comments.map(
          (comment) => new CommentDtoOutput(comment),
        ),
        totalComments: result.totalComments,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      logger.error("Error al buscar comentarios:", error.message);
      throw error;
    }
  }
}

export default CommentService;
