import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";

/* DTOs */
import UserDtoOutput from "../dto/output/user.dto.output.js";
import UserSingleDtoOutput from "../dto/output/user.single.dto.output.js";

class UserService {
  /**
   * @param {import('../repository/user.repository.js').default} userRepository
   */
  constructor(userRepository) {
    /** @type {import('../repository/user.repository.js').default} */
    this.userRepository = userRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio inyectado
  static async create() {
    const repo = await RepositoryConfig.getRepository("user");
    return new UserService(repo);
  }

  // Método para buscar todos los usuarios
  async findAllUsers(page, limit) {
    try {
      const result = await this.userRepository.findAll(page, limit);

      // Validar si se encontraron usuarios
      if (!result.users || result.users.length === 0) {
        return { users: [], totalPages: 0, totalUsers: 0, currentPage: 0 }; // Retornar un objeto con propiedades vacías si no se encontraron usuarios
      }
      logger.info(`Se encontraron ${result.users.length} usuarios.`);
      return {
        users: result.users.map((user) => new UserDtoOutput(user)), // Mapear cada usuario a un DTO de salida
        totalUsers: result.totalUsers,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      logger.error("Error al buscar usuarios:", error);
      throw error;
    }
  }

  // Método para buscar un usuario por su ID
  async findUserById(user_id) {
    try {
      const user = await this.userRepository.findById(user_id);

      // Validar si se encontró el usuario
      if (!user) {
        return null;
      }
      return new UserSingleDtoOutput(user); // Mapear el usuario a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar el usuario por ID:", error);
      throw error;
    }
  }
}

export default UserService;
