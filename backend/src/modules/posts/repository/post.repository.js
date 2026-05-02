import IPostRepository from "#shared/interfaces/postRepository.interface.js";
import Post from "../model/Post.js";
import { Op } from "sequelize";

class PostRepository extends IPostRepository {
  // Método para buscar todos los usuarios
  async findAll(page = 1, limit = 10, query = {}) {
    // Construir la cláusula WHERE dinámicamente según los parámetros de consulta
    const { title, status } = query;
    const whereClause = {};

    // Si se proporciona un título, agregar una condición de búsqueda con LIKE
    if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
    if (status) whereClause.status = status;

    const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });
    console.log("QUERY EN REPO:", query);

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

  // Método para eliminar un post
  async delete(post_id) {
    const post = await Post.findByPk(post_id);
    if (!post) return null;
    await post.destroy();
  }

  // Método para cambiar el estado de un post
  async changeStatus(post_id, status) {
    const post = await Post.findByPk(post_id);
    if (!post) return null;
    if (post.status === status) return post;
    return await post.update({ status, updated_at: new Date() });
  }
}

export default PostRepository;
