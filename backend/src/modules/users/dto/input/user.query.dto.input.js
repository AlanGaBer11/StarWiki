import parseStringToBoolean from "#shared/utils/parse.js";
class UserQueryDtoInput {
  /**
   *
   * @param {Object} query - Objeto con los parámetros de consulta
   */
  constructor(query) {
    this.emailDomain = query.emailDomain;
    this.status = query.status;
    this.verified = parseStringToBoolean(query.verified);
  }
}

export default UserQueryDtoInput;
