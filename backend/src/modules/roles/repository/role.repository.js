import IRoleRepository from "#shared/interfaces/roleRepository.interface.js";
import Role from "../model/Role.js";

// Implementación del repositorio de roles (sequelize)
class RoleRepository extends IRoleRepository {
  // Método para buscar todos los roles
  async findAll() {
    return await Role.findAll();
  }

  // Método para buscar un rol por su ID
  async findById(role_id) {
    return await Role.findByPk(role_id);
  }
}

export default RoleRepository;
