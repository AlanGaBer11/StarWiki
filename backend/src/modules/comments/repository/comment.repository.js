import ICommentRepository from "#shared/interfaces/commentRepository.interface.js";
import Comment from "../model/Comment.js";

class CommentRepository extends ICommentRepository {
  // Método para buscar todos los comentarios
  async findAll(page = 1, limit = 10, query = {}) {
    const { post_id, user_id, status } = query;
    const whereClause = {};
    if (post_id) whereClause.post_id = post_id;
    if (user_id) whereClause.user_id = user_id;
    if (status) whereClause.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Comment.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });
    return {
      comments: rows,
      totalComments: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }
}

export default CommentRepository;
