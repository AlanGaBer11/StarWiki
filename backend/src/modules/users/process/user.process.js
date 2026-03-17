import UserService from "../service/user.service.js";
import logger from "#config/chalk.js";

class UserProcess {
  /**
   * @param {import ('../service/user.service.js').default} userService
   */
  constructor(userService) {
    /**
     * @type {import('../service/user.service.js').default}
     */
    this.userService = userService;
  }

  // Método estático para crear una instancia del proceso con el servicio inyectado
  static async create() {
    const service = await UserService.create();
    return new UserProcess(service);
  }

  // Método para buscar todos los usuarios
  async findAllUsers(page, limit) {
    try {
      return await this.userService.findAllUsers(page, limit);
    } catch (error) {
      logger.error("Error en el proceso al buscar usuarios:", error.message);
      throw error;
    }
  }

  // Método para buscar un usuario por su ID
  async findUserById(user_id) {
    try {
      return await this.userService.findUserById(user_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al buscar el usuario por ID:",
        error.message,
      );
      throw error;
    }
  }

  // Método para crear un nuevo usuario
  async createUser(userData) {
    try {
      return await this.userService.createUser(userData);
    } catch (error) {
      logger.error("Error en el proceso al crear el usuario:", error.message);
      throw error;
    }
  }

  // Método para actualizar un usuario existente
  async updateUser(user_id, userData) {
    try {
      return await this.userService.updateUser(user_id, userData);
    } catch (error) {
      logger.error(
        "Error en el proceso al actualizar el usuario:",
        error.message,
      );
      throw error;
    }
  }

  // Método para eliminar un usuario por su ID
  async deleteUser(user_id) {
    try {
      return await this.userService.deleteUser(user_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al eliminar el usuario:",
        error.message,
      );
      throw error;
    }
  }

  // Método para desactivar un usuario por su ID
  async deactivateUser(user_id) {
    try {
      return await this.userService.deactivateUser(user_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al desactivar el usuario:",
        error.message,
      );
      throw error;
    }
  }

  // Método para activar un usuario por su ID
  async activateUser(user_id) {
    try {
      return await this.userService.activateUser(user_id);
    } catch (error) {
      logger.error("Error en el proceso al activar el usuario:", error.message);
      throw error;
    }
  }
}

export default UserProcess;
