import RoleProcess from "../proccess/role.process.js";
import { logger } from "#config/chalk.js";
import { RoleResponseDtoOutput } from "../dto/output/role.dto.output.js";

class RoleController {
  // Inyección de la dependencia del proceso de roles
  constructor(roleProcess) {
    this.roleProcess = roleProcess;
  }

  // Método estático para crear una instancia del controlador con el proceso inyectado
  static async create() {
    const process = await RoleProcess.create();
    return new RoleController(process);
  }

  // Método para manejar la solicitud de buscar todos los roles
  async findAllRoles(req, res) {
    try {
      // Llamar al proceso para buscar todos los roles
      const roles = await this.roleProcess.findAllRoles();

      // Validar si se encontraron roles
      if (!roles || roles.length === 0) {
        logger.warning("No se encontraron roles.");
        const response = new RoleResponseDtoOutput({
          success: false,
          status: 404,
          message: "No se encontraron roles.",
          roles: [],
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con los roles encontrados
      logger.success("Roles enviados exitosamente.entonce");
      const response = new RoleResponseDtoOutput({
        success: true,
        status: 200,
        message: "Roles encontrados exitosamente.",
        roles: roles,
      });
      return res.status(200).json(response);
    } catch (error) {
      logger.error("Error en el controlador al buscar roles:", error);
      const response = new RoleResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar los roles.",
      });
      // Enviar una respuesta de error en caso de que ocurra un problema
      return res.status(500).json(response);
    }
  }
}

export default RoleController;
