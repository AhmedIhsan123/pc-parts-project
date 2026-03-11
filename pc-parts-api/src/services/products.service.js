import { pool } from "../model/db.connect.js";

export async function getAllProducts() {
	const [rows] = await pool.query("SELECT * FROM products");
	return rows;
}

export async function getProductById(id) {
	const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
	return rows[0] ?? null;
}

const SORT_MAP = {
	featured: "id ASC",
	"price-asc": "price ASC",
	"price-desc": "price DESC",
	rating: "rating DESC",
	"name-asc": "product_name ASC",
};

export async function searchProducts({
	category,
	brand,
	minPrice,
	maxPrice,
	minRating,
	sort,
} = {}) {
	const conditions = [];
	const params = [];

	const categories = category ? [].concat(category) : [];
	const brands = brand ? [].concat(brand) : [];

	if (categories.length === 1) {
		conditions.push("category_name = ?");
		params.push(categories[0]);
	} else if (categories.length > 1) {
		conditions.push(
			`category_name IN (${categories.map(() => "?").join(", ")})`,
		);
		params.push(...categories);
	}

	if (brands.length === 1) {
		conditions.push("brand = ?");
		params.push(brands[0]);
	} else if (brands.length > 1) {
		conditions.push(`brand IN (${brands.map(() => "?").join(", ")})`);
		params.push(...brands);
	}

	if (minPrice !== undefined) {
		conditions.push("price >= ?");
		params.push(minPrice);
	}
	if (maxPrice !== undefined) {
		conditions.push("price <= ?");
		params.push(maxPrice);
	}
	if (minRating !== undefined) {
		conditions.push("rating >= ?");
		params.push(minRating);
	}

	const whereClause = conditions.length
		? `WHERE ${conditions.join(" AND ")}`
		: "";
	const orderClause = `ORDER BY ${SORT_MAP[sort] ?? SORT_MAP["featured"]}`;
	const [rows] = await pool.query(
		`SELECT * FROM products ${whereClause} ${orderClause}`,
		params,
	);
	return rows;
}
