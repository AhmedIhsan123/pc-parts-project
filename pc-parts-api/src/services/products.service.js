import * as repo from "../model/products.repo.js";

export function listProducts() {
  return repo.getAllProducts();
}

export function findProduct(id) {
  return repo.getProductById(id);
}

export function searchProducts(filters) {
  return repo.filterProducts(filters);
}