import RepositoryConfig from "#config/Repository.js";
import logger from "#config/chalk.js";
import CategoryBuilder from "../builder/category.builder.js";

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
      logger.error("Error al buscar categorías:", error.message);
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
      return new CategoryDtoOutput(category); // Mapear la categoría a un DTO de salida
    } catch (error) {
      logger.error("Error al buscar la categoría por ID:", error.message);
      throw error;
    }
  }

  // Método para crear una nueva categoría
  async createCategory(categoryData) {
    try {
      const { name, description } = categoryData;

      // Validar si ya existe una categoría con el mismo nombre
      const existingCategory = await this.categoryRepository.findByName(name);
      if (existingCategory) {
        throw new Error(`La categoría ya existe.`);
      }

      // Builder para crear la nueva categoría
      const categoryBuilder = new CategoryBuilder()
        .setName(name)
        .setDescription(description);

      const newCategory = categoryBuilder.build();

      // Crear la nueva categoría en el repositorio
      return await this.categoryRepository.create(newCategory);
    } catch (error) {
      logger.error("Error al crear la categoría:", error.message);
      throw error;
    }
  }

  // Método para actualizar una categoría existente
  async updateCategory(category_id, categoryData) {
    try {
      const { name, description, updated_at } = categoryData;

      // Verificar si la categoría existe
      const existingCategory =
        await this.categoryRepository.findById(category_id);
      if (!existingCategory) {
        throw new Error(`No se encontró la categoría con ID: ${category_id}.`);
      }

      // Builder para actualizar la categoría
      const builder = new CategoryBuilder()
        .setName(name)
        .setDescription(description)
        .setUpdatedAt(updated_at || new Date());

      const updatedCategory = builder.build();

      return await this.categoryRepository.update(category_id, updatedCategory);
    } catch (error) {
      logger.error("Error al actualizar la categoría:", error.message);
      throw error;
    }
  }

  // Método para eliminar una categoría existente
  async deleteCategory(category_id) {
    try {
      const existingCategory =
        await this.categoryRepository.findById(category_id);
      if (!existingCategory) {
        throw new Error(`No se encontró la categoría con ID: ${category_id}`);
      }
      return await this.categoryRepository.delete(category_id);
    } catch (error) {
      logger.error("Error al eliminar la categoría:", error.message);
      throw error;
    }
  }
}

export default CategoryService;
