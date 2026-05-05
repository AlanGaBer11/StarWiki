import { parsePositiveInt } from "#shared/utils/parse.js";

import { ValidationError } from "#shared/utils/errors.js";
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
    // Validar que el estado sea uno de los valores permitidos
    const validateStatus = ["Activo", "Inactivo", "Suspendido"];
    if (!validateStatus.includes(status)) {
      throw new ValidationError("El status del usuario no es válido.");
    }

    this.user_id = parsePositiveInt(user_id, "El ID del usuario");
    this.status = status;
  }
}

export default UserChangeStatusDTOInput;
