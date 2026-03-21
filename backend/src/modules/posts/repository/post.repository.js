import IPostRepository from "#shared/interfaces/postRepository.interface.js";
import Post from "../model/Post.js";

class PostRepository extends IPostRepository {
  // Método para buscar todos los usuarios
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });
    return {
      posts: rows,
      totalPosts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }
}

export default PostRepository;
