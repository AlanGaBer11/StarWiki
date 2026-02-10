import { Router } from "express";

// Importar rutas de módulos
import RoleRoutes from "#modules/roles/routes/role.routes.js";

class ApiRoutes {
  constructor(roleRoutes) {
    // Crear una instancia del enrutador de Express
    this.router = Router();

    // Crear instancias de las rutas de los módulos
    this.roleRoutes = roleRoutes;

    // Configurar las rutas de la API
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas de la API con las rutas de los módulos inyectadas
  static async create() {
    const roleRoutes = await RoleRoutes.create();
    return new ApiRoutes(roleRoutes);
  }

  // Método para configurar todas las rutas de la API
  configureRoutes() {
    this.router.use("/roles", this.roleRoutes.router);
  }
}

export default ApiRoutes;
