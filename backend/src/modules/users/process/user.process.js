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
      logger.error("Error en el proceso al buscar usuarios:", error);
      throw error;
    }
  }
}

export default UserProcess;
