import express from "express";
import * as productsController from "../controllers/products.controller.js";
import { authorizeAPI } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", authorizeAPI, productsController.renderHomePage);
router.get("/products", authorizeAPI, productsController.renderProductsPage);

export default router;
