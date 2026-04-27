import RepositoryConfig from "#config/repository.js";
import logger from "#config/chalk.js";
import CategoryBuilder from "../builder/category.builder.js";

/* DTOs */
import CategoryDtoOutput from "../dto/output/category.dto.output.js";

/* Errors */
import { NotFoundError, ConflictError } from "#shared/utils/errors.js";

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
      if (!category) throw new NotFoundError("Categoría no encontrada.");

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
      if (existingCategory) throw new ConflictError("La categoría ya existe.");

      // Builder para crear la nueva categoría
      const categoryBuilder = new CategoryBuilder()
        .setName(name)
        .setDescription(description);

      // Crear la nueva categoría en el repositorio
      return await this.categoryRepository.create(categoryBuilder.build());
    } catch (error) {
      logger.error("Error al crear la categoría:", error.message);
      throw error;
    }
  }

  // Método para actualizar una categoría existente
  async updateCategory(category_id, categoryData) {
    try {
      const { name, description } = categoryData;

      // Verificar si la categoría existe
      const existingCategory =
        await this.categoryRepository.findById(category_id);
      if (!existingCategory)
        throw new NotFoundError("Categoría no encontrada.");

      const categoryWithSameName =
        await this.categoryRepository.findByName(name);
      if (categoryWithSameName && categoryWithSameName.id !== category_id) {
        throw new ConflictError(
          `Otra categoría con el mismo nombre ya existe.`,
        );
      }

      // Builder para actualizar la categoría
      const categoryBuilder = new CategoryBuilder()
        .setName(name)
        .setDescription(description)
        .setUpdatedAt(new Date());

      // Actualizar la categoría en el repositorio
      return await this.categoryRepository.update(
        category_id,
        categoryBuilder.build(),
      );
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
      if (!existingCategory)
        throw new NotFoundError("Categoría no encontrada.");

      return await this.categoryRepository.delete(category_id);
    } catch (error) {
      logger.error("Error al eliminar la categoría:", error.message);
      throw error;
    }
  }
}

export default CategoryService;
