import PostController from "../controller/post.controller.js";
import { Router } from "express";

class PostRoutes {
  constructor(postController) {
    /**
     * @param {import('../controller/post.controller.js').default} postController
     */

    this.router = Router();

    /**
     * @type {import('../controller/post.controller.js').default}
     */
    this.postController = postController;

    // Configurar las rutas de posts
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas con el controlador inyectado
  static async create() {
    const controller = await PostController.create();
    return new PostRoutes(controller);
  }

  // Método para configurar las rutas de posts
  configureRoutes() {
    // Ruta para obtener todos los posts
    this.router.get(
      "",
      this.postController.findAllPosts.bind(this.postController),
    );
    // Ruta para obtener un post por su ID
    this.router.get(
      "/:post_id",
      this.postController.findPostById.bind(this.postController),
    );
  }
}

export default PostRoutes;
