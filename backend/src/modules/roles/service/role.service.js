import RepositoryConfig from "#config/Repository.js";
import { logger } from "#config/chalk.js";
import { RoleDtoOutput } from "../dto/output/role.dto.output.js";
import { RoleSingleDtoOutput } from "../dto/output/role.single.dto.output.js";
class RoleService {
  /**
   * @param {import('../repository/role.repository.js').default} roleRepository
   */
  constructor(roleRepository) {
    /** @type {import('../repository/role.repository.js').default} */
    this.roleRepository = roleRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio inyectado
  static async create() {
    const repo = await RepositoryConfig.getRepository("role");
    return new RoleService(repo);
  }

  // Método para buscar todos los roles
  async findAllRoles() {
    try {
      const roles = await this.roleRepository.findAll();

      // Validar si se encontraron roles
      if (!roles || roles.length === 0) {
        logger.warning("No se encontraron roles.");
        return []; // Retornar un array vacío si no se encontraron roles
      }

      logger.info(`Se encontraron ${roles.length} roles.`);
      return roles.map((role) => new RoleDtoOutput(role)); // Mapear cada rol a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar roles:", error);
      throw error;
    }
  }

  // Método para buscar un rol por su ID
  async findRoleById(role_id) {
    try {
      const role = await this.roleRepository.findById(role_id);

      // Validar si se encontró el rol
      if (!role) {
        logger.warning(`No se encontró el rol con ID: ${role_id}.`);
        return null; // Retornar null si no se encontró el rol
      }
      return new RoleSingleDtoOutput(role); // Mapear el rol a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar el rol por ID:", error);
      throw error;
    }
  }
}
export default RoleService;
