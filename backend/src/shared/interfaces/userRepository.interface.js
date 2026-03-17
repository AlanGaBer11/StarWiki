import IBaseRepository from "./baseRepository.interface.js";

class IUserRepository extends IBaseRepository {
  // Método para buscar un usuario por su username
  async findByUserName(username) {
    throw new Error("Método no implementado");
  }

  // Método para buscar un usuario por su email
  async findByEmail(email) {
    throw new Error("Método no implementado");
  }

  // Método para desactivar un usuario
  async deactivate(user_id) {
    throw new Error("Método no implementado");
  }

  // Método para activar un usuario
  async activate(user_id) {
    throw new Error("Método no implementado");
  }
}

export default IUserRepository;
