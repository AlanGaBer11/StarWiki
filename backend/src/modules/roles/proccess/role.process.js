import RoleService from "../service/role.service.js";
import logger from "#config/chalk.js";

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
  async findAllRoles(page, limit) {
    try {
      return await this.roleService.findAllRoles(page, limit);
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

  // Método para crear un nuevo rol
  async createRole(roleData) {
    try {
      return await this.roleService.createRole(roleData);
    } catch (error) {
      logger.error("Error en el proceso al crear el rol:", error);
      throw error;
    }
  }
}

export default RoleProcess;
