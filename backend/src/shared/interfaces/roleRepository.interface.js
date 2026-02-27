import IBaseRepository from "./baseRepository.interface.js";

class IRoleRepository extends IBaseRepository {
  // Método para buscar el rol por su nombre
  async findByName(name) {
    throw new Error("Método no implementado");
  }
}

export default IRoleRepository;
