import { pool } from "../model/db.connect.js";

export async function getAllProducts() {
	const [rows] = await pool.query("SELECT * FROM products");
	return rows;
}

export async function getProductById(id) {
	const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
	return rows[0] ?? null;
}
