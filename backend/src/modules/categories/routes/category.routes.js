import CategoryController from "../controller/category.controller.js";
import CategoryValidator from "../validator/category.validator.js";
import { Router } from "express";

class CategoryRoutes {
  constructor(categoryController) {
    // Crear una instancia del enrutador de Express
    this.router = Router();

    /**
     * @param {import('../controller/category.controller.js').default} categoryController
     */

    // Inyección de la dependencia del controlador de categorías
    /**
     * @type {import('../controller/category.controller.js').default}
     */
    this.categoryController = categoryController;

    // Configurar las rutas de roles
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas con el controlador inyectado
  static async create() {
    const controller = await CategoryController.create();
    return new CategoryRoutes(controller);
  }

  // Método para configurar las rutas de categorías
  configureRoutes() {
    // Ruta para obtener todas las categorías
    this.router.get(
      "/",
      this.categoryController.findAllCategories.bind(this.categoryController),
    );
    // Ruta para obtener una categoría por su ID
    this.router.get(
      "/:category_id",
      this.categoryController.findCategoryById.bind(this.categoryController),
    );
    // Ruta para crear una nueva categoría
    this.router.post(
      "/",
      CategoryValidator.createCategoryValidation,
      this.categoryController.createCategory.bind(this.categoryController),
    );
  }
}

export default CategoryRoutes;
