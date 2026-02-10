import RepositoryConfig from "#config/Repository.js";
import { logger } from "#config/chalk.js";
import { RoleDtoOutput } from "../dto/output/role.dto.output.js";
class RoleService {
  // Inyección de la dependencia del repositorio de roles
  constructor(roleRepository) {
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
}
export default RoleService;
