import IUserRepository from "#shared/interfaces/userRepository.interface.js";
import User from "../model/User.js";
class UserRepository extends IUserRepository {
  // Método para buscar todos los usuarios
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      offset,
      limit,
      attributes: { exclude: ["password"] },
      order: [["user_id", "ASC"]],
    });
    return {
      users: rows,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  // Método para buscar un usuario por su ID
  async findById(user_id) {
    return await User.findByPk(user_id, {
      attributes: { exclude: ["password"] },
    });
  }

  // Método para buscar un usuario por su username
  async findByUserName(username) {
    return await User.findOne({
      where: { username },
      attributes: { exclude: ["password"] },
    });
  }

  // Método para buscar un usuario por su email
  async findByEmail(email) {
    return await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
  }

  // Método para crear un usuario
  async create(userData) {
    return await User.create(userData);
  }

  // Método para actualizar un usuario
  async update(user_id, userData) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update(userData);
  }

  // Método para eliminar un usuario
  async delete(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.destroy();
  }

  // Método para desactivar un usuario
  async deactivate(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update({ status: "Inactivo" });
  }

  // Método para realizar un soft delete de un usuario
  async softDelete(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update({ status: "Eliminado", deleted_at: new Date() });
  }

  // Método para activar un usuario
  async activate(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update({ status: "Activo" });
  }

  // Método para suspender un usuario
  async suspend(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    return await user.update({ status: "Suspendido" });
  }
}
export default UserRepository;
