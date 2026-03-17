import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";
import UserBuilder from "../builder/user.builder.js";

/* DTOs */
import UserDtoOutput from "../dto/output/user.dto.output.js";

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
      if (!user) {
        return null;
      }
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
        throw new Error("El correo electrónico ya está registrado.");
      }

      // Validar si el username existe
      const existingUsername =
        await this.userRepository.findByUserName(username);
      if (existingUsername) {
        throw new Error("El nombre de usuario ya está registrado.");
      }

      // Builder para crear un nuevo usuario
      const userBuilder = new UserBuilder()
        .setRoleId(role_id)
        .setName(name)
        .setLastname(lastname)
        .setUsername(username)
        .setEmail(email)
        .setPassword(password);

      const newUser = userBuilder.build();

      // Crear el nuevo usuario en el repositorio
      return await this.userRepository.create(newUser);
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
        updated_at,
      } = userData;

      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new Error(`No se encontró el usuario con ID ${user_id}.`);
      }

      // Validar si el email existe y pertenece a otro usuario
      if (email) {
        const existingEmail = await this.userRepository.findByEmail(email);
        if (existingEmail && existingEmail.user_id !== user_id) {
          throw new Error("El correo electrónico ya está registrado.");
        }
      }

      // Validar si el username existe y pertenece a otro usuario
      if (username) {
        const existingUsername =
          await this.userRepository.findByUserName(username);
        if (existingUsername && existingUsername.user_id !== user_id) {
          throw new Error("El nombre de usuario ya está registrado.");
        }
      }

      // Builder para actualizar el usuario
      const builder = new UserBuilder()
        .setRoleId(role_id)
        .setName(name)
        .setLastname(lastname)
        .setUsername(username)
        .setEmail(email)
        .setPassword(password)
        .setAvatarUrl(avatar_url)
        .setBiography(biography)
        .setUpdatedAt(updated_at || new Date());

      // Construir el objeto de usuario actualizado
      const updatedUser = builder.build();

      return await this.userRepository.update(user_id, updatedUser);
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
        throw new Error(`No se encontró el usuario con ID: ${user_id}.`);
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
        throw new Error(`No se encontró el usuario con ID: ${user_id}.`);
      }

      // Validar si el usuario ya ha sido eliminado
      if (existingUser.status === "Eliminado") {
        throw new Error(`El usuario ya ha sido eliminado.`);
      }

      // Si solo permites eliminar desde "Activo" o "Inactivo":
      if (
        existingUser.status !== "Activo" &&
        existingUser.status !== "Inactivo"
      ) {
        throw new Error(
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

  // Método para desactivar un usuario
  async deactivateUser(user_id) {
    try {
      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new Error(`No se encontró el usuario con ID: ${user_id}.`);
      }

      // Validar si el usuario ya está inactivo
      if (existingUser.status === "Inactivo") {
        throw new Error(`El usuario ya está inactivo.`);
      }

      // Validar si el usuario está suspendido
      if (existingUser.status === "Suspendido") {
        throw new Error(
          `El usuario está suspendido y no puede ser desactivado.`,
        );
      }

      // Validar si el usuario ya ha sido eliminado
      if (existingUser.status === "Eliminado") {
        throw new Error(
          `El usuario ya ha sido eliminado y no puede ser desactivado.`,
        );
      }

      // Registrar el cambio de estado para auditoría
      logger.info(
        `Usuario ${user_id} cambiado de estado: ${existingUser.status} -> Inactivo.`,
      );

      return await this.userRepository.deactivate(user_id);
    } catch (error) {
      logger.error("Error al desactivar el usuario:", error.message);
      throw error;
    }
  }

  // Método para activar un usuario
  async activateUser(user_id) {
    try {
      // Validar si el usuario existe
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new Error(`No se encontró el usuario con ID: ${user_id}.`);
      }

      // Validar el estado del usuario antes de activarlo
      if (existingUser.status === "Activo") {
        throw new Error("El usuario ya está activo.");
      }

      // Validar si el usuario está eliminado
      if (existingUser.status === "Eliminado") {
        throw new Error(
          "El usuario ha sido eliminado y no puede ser activado.",
        );
      }

      // Validar si el usuario está suspendido
      if (existingUser.status === "Suspendido") {
        throw new Error("El usuario está suspendido y no puede ser activado.");
      }

      // Validar si el usuario está inactivo
      if (existingUser.status !== "Inactivo") {
        throw new Error("Solo usuarios inactivos pueden ser activados.");
      }

      // Registrar el cambio de estado para auditoría
      logger.info(
        `Usuario ${user_id} cambiado de estado: ${existingUser.status} -> Activo.`,
      );

      return await this.userRepository.activate(user_id);
    } catch (error) {
      logger.error("Error al activar el usuario:", error.message);
      throw error;
    }
  }

  // Método para suspender un usuario
  async suspendUser(user_id) {
    try {
      // Validar si el usuario existe+
      const existingUser = await this.userRepository.findById(user_id);
      if (!existingUser) {
        throw new Error(`No se encontró el usuario con ID: ${user_id}.`);
      }

      // Validar si el usuario ya está suspendido
      if (existingUser.status === "Suspendido") {
        throw new Error("El usuario ya está suspendido.");
      }

      // Validar si el usuario está eliminado
      if (existingUser.status === "Eliminado") {
        throw new Error(
          "El usuario ha sido eliminado y no puede ser suspendido.",
        );
      }

      // Validar si el usuario está activo
      if (existingUser.status !== "Activo") {
        throw new Error("Solo usuarios activos pueden ser suspendidos.");
      }

      // Registrar el cambio de estado para auditoría
      logger.info(
        `Usuario ${user_id} cambiado de estado: ${existingUser.status} -> Suspendido.`,
      );

      return await this.userRepository.suspend(user_id);
    } catch (error) {
      logger.error("Error al suspender el usuario:", error.message);
      throw error;
    }
  }
}

export default UserService;
