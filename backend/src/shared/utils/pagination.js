function pagination(query) {
  let page = Number.parseInt(query.page) || 1; // Página actual (por defecto es 1)
  let limit = Number.parseInt(query.limit) || 10; // Número de elementos por página (por defecto es 10)

  if (page < 1 || limit < 1) {
    throw new Error(
      "Los parámetros de paginación deben ser números enteros positivos.",
    );
  }
  const MAX_LIMIT = 100;
  const FINAL_LIMIT = Math.min(limit, MAX_LIMIT);
  return {
    page,
    limit: FINAL_LIMIT,
  };
}

export default pagination;
