import IBaseRepository from "./baseRepository.interface.js";

class IPostRepository extends IBaseRepository {
  // Método para buscar un post por su titulo
  async findByTitle(title) {
    throw new Error("Método no implementado.");
  }
}

export default IPostRepository;
