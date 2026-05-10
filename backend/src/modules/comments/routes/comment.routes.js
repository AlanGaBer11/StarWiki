import CommentController from "../controller/comment.controller.js";
import { Router } from "express";

class CommentRoutes {
  /**
   * @param {import("../controller/comment.controller.js").default} commentController
   */

  constructor(commentController) {
    this.router = Router();
    this.commentController = commentController;

    // Configurar las rutas de comentarios
    this.configureRoutes();
  }

  // Método estático para crear una instancia de las rutas con el controlador inyectado
  static async create() {
    const controller = await CommentController.create();
    return new CommentRoutes(controller);
  }

  // Método para configurar las rutas de comentarios
  configureRoutes() {
    // Ruta para obtener todos los comentarios
    this.router.get(
      "",
      this.commentController.findAllComments.bind(this.commentController),
    );
  }
}

export default CommentRoutes;
