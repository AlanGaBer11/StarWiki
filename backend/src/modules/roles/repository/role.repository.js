import IRoleRepository from "#shared/interfaces/roleRepository.interface.js";
import Role from "../model/Role.js";

// Implementación del repositorio de roles (sequelize)
class RoleRepository extends IRoleRepository {
  // Método para buscar todos los roles
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Role.findAndCountAll({
      offset,
      limit,
    });

    return {
      roles: rows,
      totalRoles: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  // Método para buscar un rol por su ID
  async findById(role_id) {
    return await Role.findByPk(role_id);
  }

  // Método para buscar un rol por su nombre
  async findByName(name) {
    return await Role.findOne({ where: { name } });
  }

  // Método para crear un nuevo rol
  async create(roleData) {
    return await Role.create(roleData);
  }
}

export default RoleRepository;
