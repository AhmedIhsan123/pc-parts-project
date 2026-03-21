import express from "express";
import * as productsController from "../controllers/products.controller.js";
import { authorizeAPI } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", authorizeAPI, productsController.getAllProducts);
router.get("/search", authorizeAPI, productsController.searchProducts);
router.get("/search-global", authorizeAPI, productsController.globalSearchProducts);
router.get("/:id", authorizeAPI, productsController.getProductById);

export default router;
