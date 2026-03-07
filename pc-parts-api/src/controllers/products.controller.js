import * as productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await productsService.getAllProducts();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const product = await productsService.getProductById(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const VALID_SORT_VALUES = ["featured", "price-asc", "price-desc", "rating", "name-asc"];

export const searchProducts = async (req, res) => {
	try {
		const { minPrice, maxPrice, minRating, sort } = req.query;

		const category = req.query.category
			? req.query.category.split(",").map((v) => v.trim()).filter(Boolean)
			: [];
		const brand = req.query.brand
			? req.query.brand.split(",").map((v) => v.trim()).filter(Boolean)
			: [];

		const hasFilters = category.length || brand.length || minPrice !== undefined || maxPrice !== undefined || minRating !== undefined || sort !== undefined;
		if (!hasFilters) return res.status(400).json({ error: "At least one query param is required: category, brand, minPrice, maxPrice, minRating, sort" });

		const min = minPrice !== undefined ? parseFloat(minPrice) : undefined;
		const max = maxPrice !== undefined ? parseFloat(maxPrice) : undefined;
		const minRatingVal = minRating !== undefined ? parseFloat(minRating) : undefined;

		if (min !== undefined && isNaN(min))
			return res.status(400).json({ error: "minPrice must be a valid number" });
		if (max !== undefined && isNaN(max))
			return res.status(400).json({ error: "maxPrice must be a valid number" });
		if (min !== undefined && max !== undefined && min > max)
			return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });
		if (minRatingVal !== undefined && isNaN(minRatingVal))
			return res.status(400).json({ error: "minRating must be a valid number" });
		if (sort !== undefined && !VALID_SORT_VALUES.includes(sort))
			return res.status(400).json({ error: `Invalid sort value. Must be one of: ${VALID_SORT_VALUES.join(", ")}` });

		const products = await productsService.searchProducts({
			category: category.length ? category : undefined,
			brand: brand.length ? brand : undefined,
			minPrice: min,
			maxPrice: max,
			minRating: minRatingVal,
			sort,
		});
		if (!products.length) return res.status(404).json({ error: "No products found matching the given filters" });
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Render homepage
export const renderHomePage = (req, res) => {
  res.redirect("/products");
};

// Render products listing page
export const renderProductsPage = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();

    res.render("products/index", {
      products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading products page");
  }
};

