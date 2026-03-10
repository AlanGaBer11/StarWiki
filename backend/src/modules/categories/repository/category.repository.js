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

  // Método para buscar una categoria por su ID
  async findById(category_id) {
    return await Category.findByPk(category_id);
  }

  // Método para buscar una categoría por su nombre
  async findByName(name) {
    return await Category.findOne({ where: { name } });
  }

  // Método para crear una nueva categoría
  async create(categoryData) {
    return await Category.create(categoryData);
  }

  // Método para actualizar una categoría existente
  async update(category_id, categoryData) {
    const category = await this.findById(category_id);
    if (!category) return null;
    return await category.update(categoryData);
  }
}

export default CategoryRepository;
