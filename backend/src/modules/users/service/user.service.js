import RepositoryConfig from "#config/repository.js";
import logger from "#config/chalk.js";
import UserBuilder from "../builder/user.builder.js";

/* DTOs */
import UserDtoOutput from "../dto/output/user.dto.output.js";

/* Errors */
import { NotFoundError, ConflictError } from "#shared/utils/errors.js";

class UserService {
  /**
   * @param {import('../repository/user.repository.js').default} userRepository
   */
  constructor(userRepository) {
    /** @type {import('../repository/user.repository.js').default} */
    this.userRepository = userRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio inyectado
  static async create() {
    const repo = await RepositoryConfig.getRepository("user");
    return new UserService(repo);
  }

  // Método para buscar todos los usuarios
  async findAllUsers(page, limit) {
    try {
      const result = await this.userRepository.findAll(page, limit);

      // Validar si se encontraron usuarios
      if (!result.users || result.users.length === 0) {
        return { users: [], totalPages: 0, totalUsers: 0, currentPage: 0 }; // Retornar un objeto con propiedades vacías si no se encontraron usuarios
      }
      logger.info(`Se encontraron ${result.users.length} usuarios.`);
      return {
        users: result.users.map((user) => new UserDtoOutput(user)), // Mapear cada usuario a un DTO de salida
        totalUsers: result.totalUsers,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      logger.error("Error al buscar usuarios:", error.message);
      throw error;
    }
  }

  // Método para buscar un usuario por su ID
  async findUserById(user_id) {
    try {
      const user = await this.userRepository.findById(user_id);

      // Validar si se encontró el usuario
      if (!user) throw new NotFoundError("Usuario no encontrado.");
      return new UserDtoOutput(user); // Mapear el usuario a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar el usuario por ID:", error.message);
      throw error;
    }
  }

  // Método para crear un nuevo usuario
  async createUser(userData) {
    try {
      const { role_id, name, lastname, username, email, password } = userData;

      // Validar si el email existe
      const existingEmail = await this.userRepository.findByEmail(email);
      if (existingEmail) {
        throw new ConflictError("El correo electrónico ya está registrado.");
      }

      // Validar si el username existe
      const existingUsername =
        await this.userRepository.findByUserName(username);
      if (existingUsername) {
        throw new ConflictError("El nombre de usuario ya está registrado.");
      }

      // Builder para crear un nuevo usuario
      const userBuilder = new UserBuilder()
        .setRoleId(role_id)
        .setName(name)
        .setLastname(lastname)
        .setUsername(username)
        .setEmail(email)
        .setPassword(password);

      // Crear el nuevo usuario en el repositorio
      return await this.userRepository.create(userBuilder.build());
    } catch (error) {
      logger.error("Error al crear el usuario:", error.message);
      throw error;
    }
  }

  // Método para actualizar un usuario existente
  async updateUser(user_id, userData) {
    try {
      const {
        role_id,
        name,
        lastname,
        username,
        email,
        password,
        avatar_url,
        biography,
      } = userData;

      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new NotFoundError("Usuario no encontrado.");
      }

      // Validar si el email existe y pertenece a otro usuario
      if (email) {
        const existingEmail = await this.userRepository.findByEmail(email);
        if (existingEmail && existingEmail.user_id !== user_id) {
          throw new ConflictError("El correo electrónico ya está registrado.");
        }
      }

      // Validar si el username existe y pertenece a otro usuario
      if (username) {
        const existingUsername =
          await this.userRepository.findByUserName(username);
        if (existingUsername && existingUsername.user_id !== user_id) {
          throw new ConflictError("El nombre de usuario ya está registrado.");
        }
      }

      // Builder para actualizar el usuario
      const userBuilder = new UserBuilder()
        .setRoleId(role_id)
        .setName(name)
        .setLastname(lastname)
        .setUsername(username)
        .setEmail(email)
        .setPassword(password)
        .setAvatarUrl(avatar_url)
        .setBiography(biography)
        .setUpdatedAt(new Date());

      return await this.userRepository.update(user_id, userBuilder.build());
    } catch (error) {
      logger.error("Error al actualizar el usuario:", error.message);
      throw error;
    }
  }

  // Método para eliminar (Hard Delete) un usuario (Solo para administradores)
  async deleteUser(user_id) {
    try {
      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new NotFoundError("Usuario no encontrado.");
      }

      return await this.userRepository.delete(user_id);
    } catch (error) {
      logger.error("Error al eliminar el usuario:", error.message);
      throw error;
    }
  }

  // Método para eliminar (Soft Delete) un usuario
  async softDeleteUser(user_id) {
    try {
      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new NotFoundError("Usuarion no encontrado.");
      }

      // Validar si el usuario ya ha sido eliminado
      if (existingUser.status === "Eliminado") {
        throw new ConflictError(`El usuario ya ha sido eliminado.`);
      }

      // Si solo permites eliminar desde "Activo" o "Inactivo":
      if (
        existingUser.status !== "Activo" &&
        existingUser.status !== "Inactivo"
      ) {
        throw new ConflictError(
          "Solo usuarios activos o inactivos pueden ser eliminados.",
        );
      }

      // Registrar el cambio de estado para auditoría
      logger.info(
        `Usuario ${user_id} eliminado. Status: ${existingUser.status} -> Eliminado. Fecha: ${new Date().toISOString()}`,
      );

      return await this.userRepository.softDelete(user_id);
    } catch (error) {
      logger.error("Error al eliminar el usuario:", error.message);
      throw error;
    }
  }

  // Método para cambiar el estado de un usuario
  async changeUserStatus(user_id, newStatus) {
    try {
      const user = await this.userRepository.findById(user_id);
      if (!user) throw new NotFoundError("Usuario no encontrado.");

      if (user.status === newStatus)
        throw new ConflictError("El usuario ya tiene el estado solicitado.");

      if (user.status === "Eliminado")
        throw new ConflictError(
          "No se puede cambiar el estado de un usuario eliminado.",
        );

      // Validaciones según el nuevo estado solicitado
      switch (newStatus) {
        case "Inactivo":
          if (user.status === "Suspendido")
            throw new ConflictError(
              "El usuario está suspendido y no puede ser desactivado.",
            );
          break;
        case "Activo":
          if (user.status === "Suspendido")
            throw new ConflictError(
              "El usuario está suspendido y no puede ser activado.",
            );
          if (user.status !== "Inactivo")
            throw new ConflictError(
              "Solo usuarios inactivos pueden ser activados.",
            );
          break;
        case "Suspendido":
          if (user.status !== "Activo")
            throw new ConflictError(
              "Solo usuarios activos pueden ser suspendidos.",
            );
          break;
        default:
          throw new ConflictError("El estado del usuario no es válido.");
      }
      logger.info(
        `Usuario ${user_id} cambiado de estado: ${user.status} -> ${newStatus}.`,
      );

      return await this.userRepository.changeStatus(user_id, newStatus);
    } catch (error) {
      logger.error("Error al cambiar el estado del usuario:", error.message);
      throw error;
    }
  }
}

export default UserService;
