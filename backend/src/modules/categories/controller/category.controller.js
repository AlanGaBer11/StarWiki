import CategoryProcess from "../process/category.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";
import { AppError } from "#shared/utils/errors.js";
/* DTOs */
// Salida
import CategoryResponseDtOutput from "../dto/output/category.response.dto.output.js";
// Entrada
import CategoryFindDtoInput from "../dto/input/category.find.dto.input.js";
import CategoryCreateDtoInput from "../dto/input/category.create.dto.input.js";
import CategoryUpdateDtoInput from "../dto/input/category.update.dto.input.js";

class CategoryController {
  /**
   * @param {import ('../process/category.process.js').default} categoryProcess
   */

  // Inyección de la dependencia del proceso de categorías
  constructor(categoryProcess) {
    /**
     * @type {import ('../process/category.process.js').default}
     */
    this.categoryProcess = categoryProcess;
  }
  // Método estático para crear una instancia del controlador con el proceso inyectado
  static async create() {
    const process = await CategoryProcess.create();
    return new CategoryController(process);
  }

  // Método para manejar la solicitud de buscar todas las categorías
  async findAllCategories(req, res) {
    try {
      const { page, limit } = pagination(req.query);

      // Llamar al proceso para buscar todas las categorías
      const result = await this.categoryProcess.findAllCategories(page, limit);

      // Validar si se encontraron categorías
      if (!result.categories || result.categories.length === 0) {
        logger.warning("No se encontraron categorías.");
        return res.status(404).json(
          new CategoryResponseDtOutput({
            success: false,
            status: 404,
            message: "No se encontraron categorías.",
            categories: [],
          }),
        );
      }

      // Enviar la respuesta con las categorías encontradas
      logger.success("Categorías enviadas exitosamente.");
      return res.status(200).json(
        new CategoryResponseDtOutput({
          success: true,
          status: 200,
          message: "Categorías encontradas exitosamente.",
          page,
          limit,
          totalCategories: result.totalCategories,
          categories: result.categories,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CategoryResponseDtOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new CategoryResponseDtOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de buscar una categoría por su ID
  async findCategoryById(req, res) {
    try {
      const findDto = new CategoryFindDtoInput(req.params);

      // Llamar al proceso para buscar la categoría por ID
      const category = await this.categoryProcess.findCategoryById(
        findDto.category_id,
      );

      // Enviar la respuesta con la categoría encontrada
      logger.success("Categoría enviada exitosamente.");
      return res.status(200).json(
        new CategoryResponseDtOutput({
          success: true,
          status: 200,
          message: "Categoría encontrada exitosamente.",
          category,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CategoryResponseDtOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new CategoryResponseDtOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de crear una nueva categoría
  async createCategory(req, res) {
    try {
      const createDto = new CategoryCreateDtoInput(req.body);

      // Llamar al proceso para crear la nueva categoría
      const newCategory = await this.categoryProcess.createCategory(createDto);

      // Enviar la respuesta con la categoría creada
      logger.success("Categoría creada exitosamente.");
      return res.status(201).json(
        new CategoryResponseDtOutput({
          success: true,
          status: 201,
          message: "Categoría creada exitosamente.",
          category: newCategory,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CategoryResponseDtOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new CategoryResponseDtOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de actualizar una categoría existente
  async updateCategory(req, res) {
    try {
      const updateDto = new CategoryUpdateDtoInput({
        ...req.params,
        ...req.body,
      });

      // Llamar al proceso para actualizar la categoría
      const updatedCategory = await this.categoryProcess.updateCategory(
        updateDto.category_id,
        updateDto,
      );

      //Enviar la respuesta con la categoría actualizada
      logger.success("Categoría actualizada exitosamente.");
      return res.status(200).json(
        new CategoryResponseDtOutput({
          success: true,
          status: 200,
          message: "Categoría actualizada exitosamente.",
          category: updatedCategory,
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CategoryResponseDtOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new CategoryResponseDtOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }

  // Método para manejar la solicitud de eliminar una categoría existente
  async deleteCategory(req, res) {
    try {
      const findDto = new CategoryFindDtoInput(req.params);

      // Llamar al proceso para eliminar la categoría
      await this.categoryProcess.deleteCategory(findDto.category_id);

      // Enviar la respuesta indicando que la categoría fue eliminada
      logger.success("Categoría eliminada exitosamente.");
      return res.status(200).json(
        new CategoryResponseDtOutput({
          success: true,
          status: 200,
          message: "Categoría eliminada exitosamente.",
        }),
      );
    } catch (error) {
      // Manejo centralizado de errores
      if (error instanceof AppError) {
        logger.warning(error.message);
        return res.status(error.statusCode).json(
          new CategoryResponseDtOutput({
            success: false,
            status: error.statusCode,
            message: error.message,
          }),
        );
      }
      // Manejo de errores inesperados
      logger.error("Error inesperado:", error.message);
      return res.status(500).json(
        new CategoryResponseDtOutput({
          success: false,
          status: 500,
          message: "Ocurrió un error inesperado.",
        }),
      );
    }
  }
}

export default CategoryController;
