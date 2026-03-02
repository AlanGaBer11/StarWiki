import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";

/* DTOs */
import CategoryDtoOutput from "../dto/output/category.dto.output.js";
import CategorySingleDtoOutput from "../dto/output/category.single.dto.output.js";

class CategoryService {
  /**
   * @param {import('../repository/category.repository.js').default} categoryRepository
   */
  constructor(categoryRepository) {
    /** @type {import ('../repository/category.repository.js').default} */
    this.categoryRepository = categoryRepository;
  }

  // Método estático para crear una instancia del servicio con el repositorio inyectado
  static async create() {
    const repo = await RepositoryConfig.getRepository("category");
    return new CategoryService(repo);
  }

  // Método para buscar todas las categorias
  async findAllCategories(page, limit) {
    try {
      const result = await this.categoryRepository.findAll(page, limit);

      // Validar si se encontraron categorias
      if (!result.categories || result.categories.length === 0) {
        return {
          categories: [],
          totalPages: 0,
          totalCategories: 0,
          currentPage: 0,
        }; // Retornar un objeto con propiedades vacías si no se encontraron categorias
      }
      logger.info(`Se encontraron ${result.categories.length} categorías.`);
      return {
        categories: result.categories.map(
          (category) => new CategoryDtoOutput(category),
        ), // Mapear cada categoría a un DTO de salida
        totalCategories: result.totalCategories,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      logger.error("Error al buscar categorías:", error);
      throw error;
    }
  }

  // Método para buscar una categoría por su ID
  async findCategoryById(category_id) {
    try {
      const category = await this.categoryRepository.findById(category_id);

      // Validar si se encontró la categoría
      if (!category) {
        return null; // Retornar null si no se encontró la categoría
      }
      return new CategorySingleDtoOutput(category); // Mapear la categoría a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar la categoría por ID:", error);
      throw error;
    }
  }
}

export default CategoryService;
