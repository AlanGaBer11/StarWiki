class UserChangeStatusDTOInput {
  /**
   *
   * @param {Object} param
   * @param {number} param.user_id - ID del usuario
   *
   * @param {Object} body
   * @param {string} body.status - Nuevo estado del usuario (Activo, Inactivo, Suspendido)
   */

  constructor({ user_id, status }) {
    // Validar que el user_id sea un número entero positivo
    const parsedUserId = Number.parseInt(user_id);
    if (Number.isNaN(parsedUserId) || parsedUserId <= 0) {
      throw new Error("El ID del usuario debe ser un número entero positivo.");
    }

    // Validar que el estado sea uno de los valores permitidos
    const validateStatus = ["Activo", "Inactivo", "Suspendido"];
    if (!validateStatus.includes(status)) {
      throw new Error("El status del usuario no es válido.");
    }

    this.user_id = parsedUserId;
    this.status = status;
  }
}

export default UserChangeStatusDTOInput;
