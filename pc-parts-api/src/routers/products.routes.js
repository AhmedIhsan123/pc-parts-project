import express, { Router } from "express";
import * as productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/search", productsController.searchProducts);

router.get("/search-global", productsController.globalSearchProducts);

router.get("/:id", productsController.getProductById);


export default router;
