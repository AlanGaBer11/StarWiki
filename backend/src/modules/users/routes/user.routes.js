import UserController from "../controller/user.controller.js";
import { Router } from "express";

class UserRoutes {
  constructor(userController) {
    /**
     * @param {import('../controller/user.controller.js').default} userController
     */
    this.router = Router();

    /**
     * @type {import('../controller/user.controller.js').default}
     */
    this.userController = userController;

    // Configurar las rutas de usuarios
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas con el controlador inyectado
  static async create() {
    const controller = await UserController.create();
    return new UserRoutes(controller);
  }

  // Método para configurar las rutas de usuarios
  configureRoutes() {
    // Ruta para obtener todos los usuarios
    this.router.get(
      "/",
      this.userController.findAllUsers.bind(this.userController),
    );
  }
}

export default UserRoutes;
