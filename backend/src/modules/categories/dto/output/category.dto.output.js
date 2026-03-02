class CategoryDtoOutput {
  constructor({ category_id, name, description, created_at, updated_at }) {
    this.category_id = category_id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default CategoryDtoOutput;
