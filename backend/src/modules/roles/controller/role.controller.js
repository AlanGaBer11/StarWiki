import RoleProcess from "../proccess/role.process.js";
import logger from "#config/chalk.js";

/* DTOs */
// Salida
import RoleResponseDtoOutput from "../dto/output/role.response.dto.output.js";
// Entrada
import RoleCreateDtoInput from "../dto/input/role.create.dto.input.js";

class RoleController {
  /**
   *
   * @param {import('../proccess/role.process.js').default} roleProcess
   *
   */

  // Inyección de la dependencia del proceso de roles
  constructor(roleProcess) {
    /**
     * @type {import('../proccess/role.process.js').default}
     */

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
      // Obtener los parámetros de paginación de la consulta (si se proporcionan)
      const page = Number.parseInt(req.query.page) || 1; // Página actual (por defecto es 1)
      const limit = Number.parseInt(req.query.limit) || 10; // Número de roles por página (por defecto es 10)

      // Validar que los parámetros sean números enteros positivos
      if (page < 1 || limit < 1) {
        logger.warning(
          "Los parámetros de paginación deben ser números enteros positivos.",
        );
        const response = new RoleResponseDtoOutput({
          success: false,
          status: 400,
          message:
            "Los parámetros de paginación deben ser números enteros positivos.",
          roles: [],
        });
        return res.status(400).json(response);
      }

      // Limitar el número máximo de roles por página para evitar sobrecargar el sistema
      const MAX_LIMIT = 100;
      const FINAL_LIMIT = Math.min(limit, MAX_LIMIT);

      // Llamar al proceso para buscar todos los roles
      const result = await this.roleProcess.findAllRoles(page, FINAL_LIMIT);

      // Validar si se encontraron roles
      if (!result.roles || result.roles.length === 0) {
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
      logger.success("Roles enviados exitosamente.");
      const response = new RoleResponseDtoOutput({
        success: true,
        status: 200,
        message: "Roles encontrados exitosamente.",
        page,
        limit: FINAL_LIMIT,
        totalRoles: result.totalRoles,
        roles: result.roles,
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

  // Método para manejar la solicitud de buscar un rol por su ID
  async findRoleById(req, res) {
    try {
      const { role_id } = req.params;

      // Validar que el ID del rol sea un número válido
      if (!/^\d+$/.test(role_id)) {
        logger.warning(`ID inválido: ${role_id}`);
        const response = new RoleResponseDtoOutput({
          success: false,
          status: 400,
          message: "El ID de rol debe ser un número entero positivo.",
        });
        return res.status(400).json(response);
      }

      // Llamar al proceso para buscar un rol por su ID
      const role = await this.roleProcess.findRoleById(role_id);

      // Validar si se encontró el rol
      if (!role) {
        logger.warning(`No se encontró el rol con ID: ${role_id}.`);
        const response = new RoleResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el rol con ID: ${role_id}.`,
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con el rol encontrado
      logger.success("Rol enviado exitosamente.");
      const response = new RoleResponseDtoOutput({
        success: true,
        status: 200,
        message: "Rol encontrado exitosamente.",
        role: role,
      });
      return res.status(200).json(response);
    } catch (error) {
      logger.error("Error en el controlador al buscar el rol por ID:", error);
      const response = new RoleResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar el rol por ID.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de crear un nuevo rol
  async createRole(req, res) {
    try {
      const roleDto = new RoleCreateDtoInput(req.body);

      // Validaciones básicas para los datos de entrada
      if (!roleDto.name || !roleDto.description) {
        logger.warning("Faltan datos requeridos para crear el rol.");
        const response = new RoleResponseDtoOutput({
          success: false,
          status: 400,
          message: "El nombre y la descripción del rol son requeridos.",
        });
        return res.status(400).json(response);
      }

      // Llamar al proesso para crear un nuevo rol
      const newRole = await this.roleProcess.roleService.createRole(roleDto);
      // Enviar la respuesta con el nuevo rol creado
      logger.success("Rol creado exitosamente.");
      const response = new RoleResponseDtoOutput({
        success: true,
        status: 201,
        message: "Rol creado exitosamente.",
        role: newRole,
      });
      return res.status(201).json(response);
    } catch (error) {
      logger.error("Error en el controlador al crear el rol:", error);
      const response = new RoleResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al crear el rol.",
      });
      return res.status(500).json(response);
    }
  }
}

export default RoleController;
