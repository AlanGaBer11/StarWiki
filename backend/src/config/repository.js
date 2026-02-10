class RepositoryConfig {
  // Método estático para obtener el repositorio según el tipo
  static async getRepository(type) {
    const repositories = {
      role: () => import("#modules/roles/repository/role.repository.js"),
    };

    // Validar si el tipo de repositorio existe
    if (!repositories[type]) {
      throw new Error(`Repositorio no encontrado para el tipo: ${type}`);
    }
    // Importar dinámicamente el módulo del repositorio y retornar una instancia
    const module = await repositories[type]();
    return new module.default();
  }
}

export default RepositoryConfig;
