import { pool } from "./db.connect.js";

export async function getAllProducts() {
  const [rows] = await pool.query(
    `SELECT id, name, brand, category, short_desc, price, rating, stock_qty, image_urls
     FROM products
     ORDER BY created_at DESC`
  );
  return rows;
}

export async function getProductById(id) {
  const [rows] = await pool.query(
    `SELECT *
     FROM products
     WHERE id = ?`,
    [id]
  );
  return rows[0] ?? null;
}

export async function filterProducts(filters) {
  const { category, minPrice, maxPrice, q } = filters;

  const where = [];
  const params = [];

  if (category) {
    where.push("category = ?");
    params.push(category);
  }

  if (minPrice) {
    where.push("price >= ?");
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    where.push("price <= ?");
    params.push(Number(maxPrice));
  }

  if (q) {
    where.push("(name LIKE ? OR short_desc LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like);
  }

  const sql = `
    SELECT id, name, brand, category, short_desc, price, rating, stock_qty, image_urls
    FROM products
    ${where.length ? "WHERE " + where.join(" AND ") : ""}
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(sql, params);
  return rows;
}