import CategoryProcess from "../process/category.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";

/* DTOs */
// Salida
import CategoryResponseDtOutput from "../dto/output/category.response.dto.output.js";

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
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 404,
          message: "No se encontraron categorías.",
          categories: [],
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con las categorías encontradas
      logger.success("Categorías enviadas exitosamente.");
      const response = new CategoryResponseDtOutput({
        success: true,
        status: 200,
        message: "Categorías encontradas exitosamente.",
        page,
        limit,
        totalCategories: result.totalCategories,
        categories: result.categories,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes(
          "Los parámetros de paginación deben ser números enteros positivos.",
        )
      ) {
        logger.warning("Error de validación de paginación:", error.message);
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error("Error en el controlador al buscar categorías:", error);
      const response = new CategoryResponseDtOutput({
        success: false,
        status: 500,
        message: "Error al buscar categorías.",
      });
      return res.status(500).json(response);
    }
  }
}

export default CategoryController;
