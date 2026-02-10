import RoleController from "../controller/role.controller.js";
import { Router } from "express";

class RoleRoutes {
  constructor(roleController) {
    // Crear una instancia del enrutador de Express
    this.router = Router();

    // Inyección de la dependencia del controlador de roles
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
  }
}

export default RoleRoutes;
