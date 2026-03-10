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
