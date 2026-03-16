import UserProcess from "../process/user.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";

/* DTOs */
// Salida
import UserResponseDtoOutput from "../dto/output/user.response.dto.output.js";
// Entrada
import UserFindDtoInput from "../dto/input/user.find.dto.input.js";
import UserCreateDtoInput from "../dto/input/user.create.dto.input.js";
import UserUpdateDtoInput from "../dto/input/user.update.dto.input.js";

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

      logger.error(
        "Error en el controlador al buscar usuarios:",
        error.message,
      );
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar usuarios.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de buscar un usuario por su ID
  async findUserById(req, res) {
    try {
      const dto = new UserFindDtoInput(req.params);

      // Llamar al proceso para buscar el usuario por su ID
      const user = await this.userProcess.findUserById(dto.user_id);

      // Validar si se encontró el usuario
      if (!user) {
        logger.warning(`No se encontró el usuario con ID: ${dto.user_id}.`);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el usuario con ID: ${dto.user_id}.`,
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con el usuario encontrado
      logger.success("Usuario enviado exitosamente.");
      const response = new UserResponseDtoOutput({
        success: true,
        status: 200,
        message: "Usuario encontrado exitosamente.",
        user,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (error.message?.includes("número entero positivo")) {
        logger.warning(error.message);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error(
        "Error en el controlador al buscar el usuario por ID:",
        error.message,
      );
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar el usuario por ID.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de crear un nuevo usuario
  async createUser(req, res) {
    try {
      const dto = new UserCreateDtoInput(req.body);

      // Validaciones adicionales para el DTO de creación de usuario
      if (
        !dto.role_id ||
        !dto.name ||
        !dto.lastname ||
        !dto.username ||
        !dto.email ||
        !dto.password
      ) {
        logger.warning("Faltan datos requeridos para crear el usuario.");
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: "Todos los campos son requeridos.",
        });
        return res.status(400).json(response);
      }

      // Llamar al proceso para crear un nuevo usuario
      const newUser = await this.userProcess.createUser(dto);

      // Enviar la respuesta con el nuevo usuario creado
      logger.success("Usuario creado exitosamente.");
      const response = new UserResponseDtoOutput({
        success: true,
        status: 201,
        message: "Usuario creado exitosamente.",
        user: newUser,
      });
      return res.status(201).json(response);
    } catch (error) {
      if (
        error.message?.includes("número entero positivo") ||
        error.message?.includes("correo electrónico ya está registrado") ||
        error.message?.includes("nombre de usuario ya está registrado")
      ) {
        logger.warning(error.message);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error(
        "Error en el controlador al crear el usuario:",
        error.message,
      );
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al crear el usuario.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de actualizar un usuario existente
  async updateUser(req, res) {
    try {
      const dto = new UserUpdateDtoInput({ ...req.params, ...req.body });

      //Buscar el usuario existente
      const existingUser = await this.userProcess.findUserById(dto.user_id);
      if (!existingUser) {
        logger.warning(`No se encontró el usuario con ID: ${dto.user_id}.`);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el usuario con ID: ${dto.user_id}.`,
        });
        return res.status(404).json(response);
      }

      // Lamar al proceso para actualizar el usuario existente
      const updatedUser = await this.userProcess.updateUser(dto.user_id, dto);

      // Enviar la respuesta con el usuario actualizado
      logger.success("Usuario actualizado exitosamente.");
      const response = new UserResponseDtoOutput({
        success: true,
        status: 200,
        message: "Usuario actualizado exitosamente.",
        user: updatedUser,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes("correo electrónico ya está registrado") ||
        error.message?.includes("nombre de usuario ya está registrado") ||
        error.message?.includes("número entero positivo") ||
        error.message?.includes("al menos un campo para actualizar")
      ) {
        logger.warning(error.message);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error(
        "Error en el controlador al actualizar el usuario:",
        error.message,
      );
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al actualizar el usuario.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de eliminar un usuario por su ID
  async deleteUser(req, res) {
    try {
      const dto = new UserFindDtoInput(req.params);

      // Buscar el usuario existente
      const existingUser = await this.userProcess.findUserById(dto.user_id);
      if (!existingUser) {
        logger.warning(`No se encontró el usuario con ID: ${dto.user_id}.`);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 404,
          message: `No se encontró el usuario con ID: ${dto.user_id}`,
        });
        return res.status(404).json(response);
      }

      // Llamar al proceso para eliminar el usuario por su ID
      await this.userProcess.deleteUser(dto.user_id);

      // Enviar la respuesta indicando que el usuario fue eliminado
      logger.success("Usuario eliminado exitosamente.");
      const response = new UserResponseDtoOutput({
        success: true,
        status: 200,
        message: "Usuario eliminado exitosamente.",
      });
      return res.status(200).json(response);
    } catch (error) {
      if (error.message?.includes("número entero positivo")) {
        logger.warning(error.message);
        const response = new UserResponseDtoOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error(
        "Error en el controlador al eliminar el usuario:",
        error.message,
      );
      const response = new UserResponseDtoOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al eliminar el usuario.",
      });
      return res.status(500).json(response);
    }
  }
}

export default UserController;
