class CategoryBuilder {
  constructor() {
    this.category = {};
  }

  setName(name) {
    this.category.name = name;
    return this;
  }

  setDescription(description) {
    this.category.description = description;
    return this;
  }

  setCreatedAt(created_at) {
    this.category.created_at = created_at;
    return this;
  }

  setUpdatedAt(updated_at) {
    this.category.updated_at = updated_at;
    return this;
  }

  build() {
    return this.category;
  }
}
export default CategoryBuilder;
