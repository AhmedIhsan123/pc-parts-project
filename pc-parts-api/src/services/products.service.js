import { pool } from "../model/db.connect.js";

export async function getAllProducts() {
	const [rows] = await pool.query("SELECT * FROM products");
	return rows;
}

export async function getProductById(id) {
	const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
	return rows[0] ?? null;
}

export async function searchProducts({ category, brand, minPrice, maxPrice } = {}) {
	const conditions = [];
	const params = [];

	if (category) {
		conditions.push("category_name = ?");
		params.push(category);
	}
	if (brand) {
		conditions.push("brand = ?");
		params.push(brand);
	}
	if (minPrice !== undefined) {
		conditions.push("price >= ?");
		params.push(minPrice);
	}
	if (maxPrice !== undefined) {
		conditions.push("price <= ?");
		params.push(maxPrice);
	}

	const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
	const [rows] = await pool.query(`SELECT * FROM products ${whereClause}`, params);
	return rows;
}