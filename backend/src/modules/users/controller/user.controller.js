import UserProcess from "../process/user.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";

/* DTOs */
// Salida
import UserResponseDtoOutput from "../dto/output/user.response.dto.output.js";

class UserController {
  /**
   * @param {import('../process/user.process.js').default} userProcess
   */
  constructor(userProcess) {
    /**
     * @type {import('../process/user.process.js').default}
     */
    this.userProcess = userProcess;
  }

  // Método estático para crear una instancia del controlador con el proceso inyectado
  static async create() {
    const process = await UserProcess.create();
    return new UserController(process);
  }

  // Método para manejar la solicitud de buscar todos los usuarios
  async findAllUsers(req, res) {
    try {
      const { page, limit } = pagination(req.query);

      // Llamar al proceso para buscar todos los usuarios
      const result = await this.userProcess.findAllUsers(page, limit);

      // Validar si se encontraron usuarios
      if (!result.users || result.users.length === 0) {
        logger.warning("No se encontraron usuarios.");
        const response = new UserResponseDtoOutput({
          success: false,
          status: 404,
          message: "No se encontraron usuarios.",
          users: [],
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con los usuarios encontrados
      logger.success("Usuarios enviados exitosamente.");
      const response = new UserResponseDtoOutput({
        success: true,
        status: 200,
        message: "Usuarios encontrados exitosamente.",
        page,
        limit,
        totalUsers: result.totalUsers,
        users: result.users,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes(
          "Los parámetros de paginación deben ser números enteros positivos.",
        )
      ) {
        logger.warning("Error de validación de paginación:", error.message);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }

      logger.error("Error en el controlador al buscar usuarios:", error);
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar usuarios.",
      });
      return res.status(500).json(response);
    }
  }
}

export default UserController;
