import RoleProcess from "../process/role.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
import { AppError } from "#shared/utils/errors.js";
/* DTOs */
// Salida
import RoleResponseDtoOutput from "../dto/output/role.response.dto.output.js";
// Entrada
import RoleCreateDtoInput from "../dto/input/role.create.dto.input.js";
import RoleFindDtoInput from "../dto/input/role.find.dto.input.js";
import RoleUpdateDtoInput from "../dto/input/role.update.dto.input.js";

class RoleController {
  /**
   * @param {import('../process/role.process.js').default} roleProcess
   */

  // Inyección de la dependencia del proceso de roles
  constructor(roleProcess) {
    /**
     * @type {import('../process/role.process.js').default}
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
      const { page, limit } = pagination(req.query);

      // Llamar al proceso para buscar todos los roles
      const result = await this.roleProcess.findAllRoles(page, limit);

      // Validar si se encontraron roles
      if (!result.roles || result.roles.length === 0) {
        logger.warning("No se encontraron roles.");
        return res.status(404).json(
          new RoleResponseDtoOutput({
            success: false,
            status: 404,
            message: "No se encontraron roles.",
            roles: [],
          }),
        );
      }

      // Enviar la respuesta con los roles encontrados
      logger.success("Roles enviados exitosamente.");
      return res.status(200).json(
        new RoleResponseDtoOutput({
          success: true,
          status: 200,
          message: "Roles encontrados exitosamente.",
          page,
          limit,
          totalRoles: result.totalRoles,
          roles: result.roles,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new RoleResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new RoleResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de buscar un rol por su ID
  async findRoleById(req, res) {
    try {
      const findDto = new RoleFindDtoInput(req.params);

      // Llamar al proceso para buscar un rol por su ID
      const role = await this.roleProcess.findRoleById(findDto.role_id);

      // Enviar la respuesta con el rol encontrado
      logger.success("Rol enviado exitosamente.");
      return res.status(200).json(
        new RoleResponseDtoOutput({
          success: true,
          status: 200,
          message: "Rol encontrado exitosamente.",
          role,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new RoleResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new RoleResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de crear un nuevo rol
  async createRole(req, res) {
    try {
      const createDto = new RoleCreateDtoInput(req.body);

      // Llamar al proceso para crear un nuevo rol
      const newRole = await this.roleProcess.createRole(createDto);

      // Enviar la respuesta con el nuevo rol creado
      logger.success("Rol creado exitosamente.");
      return res.status(201).json(
        new RoleResponseDtoOutput({
          success: true,
          status: 201,
          message: "Rol creado exitosamente.",
          role: newRole,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new RoleResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      const response = new RoleResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error inesperado.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de actualizar un rol existente
  async updateRole(req, res) {
    try {
      const updateDto = new RoleUpdateDtoInput({ ...req.params, ...req.body });

      // Llamar al proceso para actualizar el rol existente
      const updateRole = await this.roleProcess.updateRole(
        updateDto.role_id,
        updateDto,
      );

      // Enviar la respuesta con el rol actualizado
      logger.success("Rol actualizado exitosamente.");
      return res.status(200).json(
        new RoleResponseDtoOutput({
          success: true,
          status: 200,
          message: "Rol actualizado exitosamente.",
          role: updateRole,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new RoleResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new RoleResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de eliminar un rol existente
  async deleteRole(req, res) {
    try {
      const findDto = new RoleFindDtoInput(req.params);

      // Llamar al proceso para eliminar el rol existente
      await this.roleProcess.deleteRole(findDto.role_id);

      // Enviar la respuesta con el rol eliminado
      logger.success("Rol eliminado exitosamente.");
      return res.status(200).json(
        new RoleResponseDtoOutput({
          success: true,
          status: 200,
          message: "Rol eliminado exitosamente.",
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new RoleResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new RoleResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }
}

export default RoleController;
