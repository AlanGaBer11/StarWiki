import RoleService from "../service/role.service.js";
import { logger } from "#config/chalk.js";

class RoleProcess {
  // Inyección de la dependencia del servicio de roles
  constructor(roleService) {
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
}

export default RoleProcess;
