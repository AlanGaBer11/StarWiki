import CategoryService from "../service/category.service.js";
import logger from "#config/chalk.js";

class CategoryProcess {
  /**
   * @param {import ('../service/category.service.js').default} categoriService
   */
  constructor(categoriService) {
    /**
     * @type {import ('../service/category.service.js').default}
     */
    this.categoryService = categoriService;
  }
  // Método estático para crear una instancia del proceso con el servicio inyectado
  static async create() {
    const service = await CategoryService.create();
    return new CategoryProcess(service);
  }

  // Método para buscar todas las categorias
  async findAllCategories(page, limit) {
    try {
      return await this.categoryService.findAllCategories(page, limit);
    } catch (error) {
      logger.error("Error en el proceso al buscar categorías:", error.message);
      throw error;
    }
  }

  // Método para buscar una categoría por su ID
  async findCategoryById(category_id) {
    try {
      return await this.categoryService.findCategoryById(category_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al buscar categoría por ID:",
        error.message,
      );
      throw error;
    }
  }

  // Método para crear una nueva categoría
  async createCategory(categoryData) {
    try {
      return await this.categoryService.createCategory(categoryData);
    } catch (error) {
      logger.error("Error en el proceso al crear la categoría:", error.message);
      throw error;
    }
  }

  // Método para actualizar una categoría existente
  async updateCategory(category_id, categoryData) {
    try {
      return await this.categoryService.updateCategory(
        category_id,
        categoryData,
      );
    } catch (error) {
      logger.error(
        "Error en el proceso al actualizar la categoría:",
        error.message,
      );
      throw error;
    }
  }

  // Método para eliminar una categoría existente
  async deleteCategory(category_id) {
    try {
      return await this.categoryService.deleteCategory(category_id);
    } catch (error) {
      logger.error(
        "Error en el proceso al eliminar la categoría:",
        error.message,
      );
      throw error;
    }
  }
}

export default CategoryProcess;
