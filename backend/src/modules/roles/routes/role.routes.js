import RoleController from "../controller/role.controller.js";
import { Router } from "express";
import createRoleValidation from "../validator/role.validator.js";
class RoleRoutes {
  constructor(roleController) {
    // Crear una instancia del enrutador de Express
    this.router = Router();

    /**
     * @param {import('../controller/role.controller.js').default} roleController
     */

    // Inyección de la dependencia del controlador de roles

    /**
     * @type {import('../controller/role.controller.js').default}
     */
    this.roleController = roleController;

    // Configurar las rutas de roles
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas con el controlador inyectado
  static async create() {
    const controller = await RoleController.create();
    return new RoleRoutes(controller);
  }

  // Método para configurar las rutas de roles
  configureRoutes() {
    // Ruta para obtener todos los roles
    this.router.get(
      "/",
      this.roleController.findAllRoles.bind(this.roleController),
    );
    // Ruta para obtener un rol por su ID
    this.router.get(
      "/:role_id",
      this.roleController.findRoleById.bind(this.roleController),
    );
    this.router.post(
      "/",
      createRoleValidation,
      this.roleController.createRole.bind(this.roleController),
    );
  }
}

export default RoleRoutes;
