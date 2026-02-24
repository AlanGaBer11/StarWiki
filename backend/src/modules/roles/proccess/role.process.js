import RoleService from "../service/role.service.js";
import { logger } from "#config/chalk.js";

class RoleProcess {
  /**
   * @param {import('../service/role.service.js').default} roleService
   */
  constructor(roleService) {
    /** @type {import('../service/role.service.js').default} */
    this.roleService = roleService;
  }

  // Método estático para crear una instancia del proceso con el servicio inyectado
  static async create() {
    const service = await RoleService.create();
    return new RoleProcess(service);
  }

  // Método para buscar todos los roles
  async findAllRoles() {
    try {
      return await this.roleService.findAllRoles();
    } catch (error) {
      logger.error("Error en el proceso al buscar roles:", error);
      throw error;
    }
  }

  // Método para buscar un rol por su ID
  async findRoleById(role_id) {
    try {
      return await this.roleService.findRoleById(role_id);
    } catch (error) {
      logger.error("Error en el proceso al buscar el rol por ID:", error);
      throw error;
    }
  }
}

export default RoleProcess;
