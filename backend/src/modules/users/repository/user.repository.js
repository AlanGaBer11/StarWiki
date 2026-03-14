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
}

export default UserRepository;
