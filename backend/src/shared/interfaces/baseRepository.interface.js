class IBaseRepository {
  // Método para buscar todos los registros
  async findAll() {
    throw new Error("Método no implementado.");
  }

  // Método para buscar un registro por su ID
  async findById(id) {
    throw new Error("Método no implementado.");
  }

  // Método para crear un nuevo registro
  async create(data) {
    throw new Error("Método no implementado.");
  }

  // Método para actualizar un registro existente
  async update(id, data) {
    throw new Error("Método no implementado.");
  }
}

export default IBaseRepository;
