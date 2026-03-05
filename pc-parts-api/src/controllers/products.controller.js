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

export const searchProducts = async (req, res) => {
	try {
		const { category, brand, minPrice, maxPrice } = req.query;

		const hasFilters = category || brand || minPrice !== undefined || maxPrice !== undefined;
		if (!hasFilters) return res.status(400).json({ error: "At least one filter param is required: category, brand, minPrice, maxPrice" });

		const min = minPrice !== undefined ? parseFloat(minPrice) : undefined;
		const max = maxPrice !== undefined ? parseFloat(maxPrice) : undefined;

		if (min !== undefined && isNaN(min))
			return res.status(400).json({ error: "minPrice must be a valid number" });
		if (max !== undefined && isNaN(max))
			return res.status(400).json({ error: "maxPrice must be a valid number" });
		if (min !== undefined && max !== undefined && min > max)
			return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });

		const products = await productsService.searchProducts({ category, brand, minPrice: min, maxPrice: max });
		if (!products.length) return res.status(404).json({ error: "No products found matching the given filters" });
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};