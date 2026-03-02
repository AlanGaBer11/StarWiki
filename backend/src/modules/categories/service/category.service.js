import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";

/* DTOs */
import CategoryDtoOutput from "../dto/output/category.dto.output.js";

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
      logger.error("Erro al bucar categorías:", error);
      throw error;
    }
  }
}

export default CategoryService;
