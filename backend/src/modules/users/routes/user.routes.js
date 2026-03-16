import UserController from "../controller/user.controller.js";
import { Router } from "express";
import UserValidator from "../validator/user.validator.js";

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
    // Ruta para obtener un usuario por su ID
    this.router.get(
      "/:user_id",
      this.userController.findUserById.bind(this.userController),
    );
    // Ruta para crear un nuevo usuario
    this.router.post(
      "/",
      UserValidator.createUserValidation,
      this.userController.createUser.bind(this.userController),
    );
    // Ruta para actualizar un usuario existente
    this.router.put(
      "/:user_id",
      UserValidator.updateUserValidation,
      this.userController.updateUser.bind(this.userController),
    );
    // Ruta para eliminar un usuario
    this.router.delete(
      "/:user_id",
      this.userController.deleteUser.bind(this.userController),
    );
  }
}

export default UserRoutes;
