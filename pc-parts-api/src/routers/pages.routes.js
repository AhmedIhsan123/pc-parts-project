import express from "express";
import * as productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", productsController.renderHomePage);
router.get("/products", productsController.renderProductsPage);


export default router;