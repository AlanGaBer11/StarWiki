import { Router } from "express";

// Importar rutas de módulos
import RoleRoutes from "#modules/roles/routes/role.routes.js";
import CategoryRoutes from "#modules/categories/routes/category.routes.js";
import UserRoutes from "#modules/users/routes/user.routes.js";
import PostRoutes from "#modules/posts/routes/post.routes.js";

class ApiRoutes {
  constructor(roleRoutes, categoryRoutes, userRoutes, postRoutes) {
    // Crear una instancia del enrutador de Express
    this.router = Router();

    // Crear instancias de las rutas de los módulos
    this.roleRoutes = roleRoutes;
    this.categoryRoutes = categoryRoutes;
    this.userRoutes = userRoutes;
    this.postRoutes = postRoutes;

    // Configurar las rutas de la API
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas de la API con las rutas de los módulos inyectadas
  static async create() {
    const roleRoutes = await RoleRoutes.create();
    const categoryRoutes = await CategoryRoutes.create();
    const userRoutes = await UserRoutes.create();
    const postRoutes = await PostRoutes.create();
    return new ApiRoutes(roleRoutes, categoryRoutes, userRoutes, postRoutes);
  }

  // Método para configurar todas las rutas de la API
  configureRoutes() {
    this.router.use("/roles", this.roleRoutes.router);
    this.router.use("/categories", this.categoryRoutes.router);
    this.router.use("/users", this.userRoutes.router);
    this.router.use("/posts", this.postRoutes.router);
  }
}

export default ApiRoutes;
