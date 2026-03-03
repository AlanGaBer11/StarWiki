import IBaseRepository from "./baseRepository.interface.js";
class ICategoryRepository extends IBaseRepository {
  // Método para buscar una categoría por su nombre
  async findByName(name) {
    throw new Error("Método no implementado.");
  }
}
export default ICategoryRepository;
