import * as service from "../services/products.service.js";

export async function productsPage(req, res) {
  const products = await service.listProducts();
  res.render("products/index", { products });
}

export async function productDetailPage(req, res) {
  const id = Number(req.params.id);
  const product = await service.findProduct(id);

  if (!product) return res.status(404).send("Not found");

  res.render("products/detail", { product });
}

export async function apiGetProducts(req, res) {
  const { category, minPrice, maxPrice, q } = req.query;

  const products = await service.searchProducts({
    category,
    minPrice,
    maxPrice,
    q,
  });

  res.json({ products });
}