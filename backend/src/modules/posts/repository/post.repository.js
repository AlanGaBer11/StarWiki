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

  // Método para buscar un post por su ID
  async findById(post_id) {
    return await Post.findByPk(post_id);
  }

  // Método para buscar un post por su título
  async findByTitle(title) {
    return await Post.findOne({ where: { title } });
  }

  // Método para crear un nuevo post
  async create(postData) {
    return await Post.create(postData);
  }

  // Método para actualizar un post
  async update(post_id, postData) {
    const post = await Post.findByPk(post_id);
    if (!post) return null;
    return await post.update(postData);
  }
}

export default PostRepository;
