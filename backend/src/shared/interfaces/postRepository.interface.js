import IBaseRepository from "./baseRepository.interface.js";

class IPostRepository extends IBaseRepository {
  // Método para buscar un post por su titulo
  async findByTitle(title) {
    throw new Error("Método no implementado.");
  }

  // Método para cambiar el estado de un post
  async changeStatus(post_id, status) {
    throw new Error("Método no implementado.");
  }
}

export default IPostRepository;
