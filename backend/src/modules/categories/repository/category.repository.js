import ICategoryRepository from "#shared/interfaces/categoryRepository.interface.js";
import Category from "../model/Category.js";

// Implementación del repositorio de categorías (sequelize)
class CategoryRepository extends ICategoryRepository {
  // Método para buscar todas las categorias
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Category.findAndCountAll({
      offset,
      limit,
    });

    return {
      categories: rows,
      totalCategories: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }
}

export default CategoryRepository;
