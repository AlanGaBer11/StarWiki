import CategoryController from "../controller/category.controller.js";
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
  }
}

export default CategoryRoutes;
