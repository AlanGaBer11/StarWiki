import RoleController from "../controller/role.controller.js";
import RoleValidator from "../validator/role.validator.js";
import { Router } from "express";

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
    // Ruta para crear un nuevo rol
    this.router.post(
      "/",
      RoleValidator.createRoleValidation,
      this.roleController.createRole.bind(this.roleController),
    );
    // Ruta para actualizar un rol existente
    this.router.patch(
      "/:role_id",
      RoleValidator.updateRoleValidation,
      this.roleController.updateRole.bind(this.roleController),
    );
    // Ruta para eliminar un rol existente
    this.router.delete(
      "/:role_id",
      this.roleController.deleteRole.bind(this.roleController),
    );
  }
}

export default RoleRoutes;
