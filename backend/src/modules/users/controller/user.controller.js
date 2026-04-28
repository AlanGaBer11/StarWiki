import UserProcess from "../process/user.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
import { AppError } from "#shared/utils/errors.js";

/* DTOs */
// Salida
import UserResponseDtoOutput from "../dto/output/user.response.dto.output.js";
// Entrada
import UserFindDtoInput from "../dto/input/user.find.dto.input.js";
import UserCreateDtoInput from "../dto/input/user.create.dto.input.js";
import UserUpdateDtoInput from "../dto/input/user.update.dto.input.js";
import UserChangeStatusDTOInput from "../dto/input/user.change_status.dto.input.js";
import e from "express";

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
        return res.status(404).json(
          new UserResponseDtoOutput({
            success: false,
            status: 404,
            message: "No se encontraron usuarios.",
            users: [],
          }),
        );
      }

      // Enviar la respuesta con los usuarios encontrados
      logger.success("Usuarios enviados exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Usuarios encontrados exitosamente.",
          page,
          limit,
          totalUsers: result.totalUsers,
          users: result.users,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de buscar un usuario por su ID
  async findUserById(req, res) {
    try {
      const findDto = new UserFindDtoInput(req.params);

      // Llamar al proceso para buscar el usuario por su ID
      const user = await this.userProcess.findUserById(findDto.user_id);

      // Enviar la respuesta con el usuario encontrado
      logger.success("Usuario enviado exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Usuario encontrado exitosamente.",
          user,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de crear un nuevo usuario
  async createUser(req, res) {
    try {
      const createDto = new UserCreateDtoInput(req.body);

      // Llamar al proceso para crear un nuevo usuario
      const newUser = await this.userProcess.createUser(createDto);

      // Enviar la respuesta con el nuevo usuario creado
      logger.success("Usuario creado exitosamente.");
      return res.status(201).json(
        new UserResponseDtoOutput({
          success: true,
          status: 201,
          message: "Usuario creado exitosamente.",
          user: newUser,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de actualizar un usuario existente
  async updateUser(req, res) {
    try {
      const updateDto = new UserUpdateDtoInput({ ...req.params, ...req.body });

      // Lamar al proceso para actualizar el usuario existente
      const updatedUser = await this.userProcess.updateUser(
        updateDto.user_id,
        updateDto,
      );

      // Enviar la respuesta con el usuario actualizado
      logger.success("Usuario actualizado exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Usuario actualizado exitosamente.",
          user: updatedUser,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de eliminar un usuario por su ID
  async deleteUser(req, res) {
    try {
      const findDto = new UserFindDtoInput(req.params);

      // Llamar al proceso para eliminar el usuario por su ID
      await this.userProcess.deleteUser(findDto.user_id);

      // Enviar la respuesta indicando que el usuario fue eliminado
      logger.success("Usuario eliminado exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Usuario eliminado exitosamente.",
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de eliminar (soft delete) un usuario por su ID
  async softDeleteUser(req, res) {
    try {
      const findDto = new UserFindDtoInput(req.params);

      // Llamar al proceso para eliminar (soft delete) el usuario por su ID
      await this.userProcess.softDeleteUser(findDto.user_id);

      // Enviar la respuesta indicando que el usuario fue eliminado (soft delete)
      logger.success("Usuario eliminado (soft delete) exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Usuario eliminado (soft delete) exitosamente.",
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de cambiar el estado de un usuario por su ID
  async changeUserStatus(req, res) {
    try {
      const findDto = new UserChangeStatusDTOInput({
        ...req.params,
        ...req.body,
      });

      // Llamar al proceso para cambiar el estado del usuario por su ID
      const updatedUser = await this.userProcess.changeUserStatus(
        findDto.user_id,
        findDto.status,
      );

      // Enviar la respuesta con el usuario actualizado
      logger.success("Estado del usuario cambiado exitosamente.");
      return res.status(200).json(
        new UserResponseDtoOutput({
          success: true,
          status: 200,
          message: "Estado del usuario cambiado exitosamente.",
          user: updatedUser,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new UserResponseDtoOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new UserResponseDtoOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }
}

export default UserController;
