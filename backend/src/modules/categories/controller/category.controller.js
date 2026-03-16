import CategoryProcess from "../process/category.process.js";
import logger from "#config/chalk.js";
import pagination from "#shared/utils/pagination.js";

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
        message: "Ocurrió un error al buscar categorías.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de buscar una categoría por su ID
  async findCategoryById(req, res) {
    try {
      const dto = new CategoryFindDtoInput(req.params);

      // Llamar al proceso para buscar la categoría por ID
      const category = await this.categoryProcess.findCategoryById(
        dto.category_id,
      );

      // Validar que se encontró la categoría
      if (!category) {
        logger.warning(
          `No se encontró la categoría con ID: ${dto.category_id}`,
        );
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 404,
          message: `No se encontró la categoría con ID: ${dto.category_id}`,
        });
        return res.status(404).json(response);
      }

      // Enviar la respuesta con la categoría encontrada
      logger.success("Categoría enviada exitosamente.");
      const response = new CategoryResponseDtOutput({
        success: true,
        status: 200,
        message: "Categoría encontrada exitosamente.",
        category,
      });
      return res.status(200).json(response);
    } catch (error) {
      // Validar si el error es por un ID no válido
      if (error.message?.includes("número entero positivo")) {
        logger.warning("ID inválido");
        const reponse = new CategoryResponseDtOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(reponse);
      }

      logger.error(
        "Error en el controlador al buscar la categoría por ID:",
        error,
      );
      const response = new CategoryResponseDtOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al buscar la categoría por ID.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de crear una nueva categoría
  async createCategory(req, res) {
    try {
      const categoryCreateInput = new CategoryCreateDtoInput(req.body);

      // Validaciones básicas  para los datos de entrada
      if (!categoryCreateInput.name || !categoryCreateInput.description) {
        logger.warning("Faltan datos requeridos para crear la categoría.");
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 400,
          message: "El nombre y la descripción son requeridos.",
        });
        return res.status(400).json(response);
      }

      // Llamar al proceso para crear la nueva categoría
      const newCategory =
        await this.categoryProcess.createCategory(categoryCreateInput);

      // Enviar la respuesta con la categoría creada
      logger.success("Categoría creada exitosamente.");
      const response = new CategoryResponseDtOutput({
        success: true,
        status: 201,
        message: "Categoría creada exitosamente.",
        category: newCategory,
      });
      return res.status(201).json(response);
    } catch (error) {
      logger.error("Error en el controlador al crear la categoría:", error);
      const response = new CategoryResponseDtOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al crear la categoría.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de actualizar una categoría existente
  async updateCategory(req, res) {
    try {
      const dto = new CategoryUpdateDtoInput({ ...req.params, ...req.body });

      // Buscar la categoría existente
      const existingCateory = await this.categoryProcess.findCategoryById(
        dto.category_id,
      );
      if (!existingCateory) {
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 404,
          message: `No se encontró la categoría con ID: ${dto.category_id}.`,
        });
        return res.status(404).json(response);
      }

      // Llamar al proceso para actualizar la categoría
      const updatedCategory = await this.categoryProcess.updateCategory(
        dto.category_id,
        dto,
      );

      //Envar la respuesta con la categoría actualizada
      logger.success("Categoría actualizada exitosamente.");
      const response = new CategoryResponseDtOutput({
        success: true,
        status: 200,
        message: "Categoría actualizada exitosamente.",
        category: updatedCategory,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message?.includes("número entero positivo") ||
        error.message?.includes("al menos un campo para actualizar")
      ) {
        logger.warning(
          "Datos inválidos para actualizar la categoría:",
          error.message,
        );
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }

      logger.error(
        "Error en el controlador al actualizar la categoría:",
        error,
      );
      const response = new CategoryResponseDtOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al actualizar la categoría.",
      });
      return res.status(500).json(response);
    }
  }

  // Método para manejar la solicitud de eliminar una categoría existente
  async deleteCategory(req, res) {
    try {
      const dto = new CategoryFindDtoInput(req.params);

      // Buscar la categoría existente
      const existingCateory = await this.categoryProcess.findCategoryById(
        dto.category_id,
      );
      if (!existingCateory) {
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 404,
          message: `No se encontró la categoría con ID: ${dto.category_id}`,
        });
        return res.status(404).json(response);
      }

      // Llamar al proceso para eliminar la categoría
      await this.categoryProcess.deleteCategory(dto.category_id);
      const response = new CategoryResponseDtOutput({
        success: true,
        status: 200,
        message: "Categoría eliminada exitosamente.",
      });
      return res.status(200).json(response);
    } catch (error) {
      if (error.message?.includes("número entero positivo")) {
        logger.warning(
          "Datos inválidos para actualizar la categoría:",
          error.message,
        );
        const response = new CategoryResponseDtOutput({
          success: false,
          status: 400,
          message: error.message,
        });
        return res.status(400).json(response);
      }
      logger.error("Error en el controlador al eliminar la categoría:", error);
      const response = new CategoryResponseDtOutput({
        success: false,
        status: 500,
        message: "Ocurrió un error al eliminar la categoría.",
      });
      return res.status(500).json(response);
    }
  }
}

export default CategoryController;
