<<<<<<< HEAD
import { Router } from "express";
import {
  productsPage,
  productDetailPage,
  apiGetProducts,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", productsPage);
router.get("/products/:id", productDetailPage);
router.get("/api/products", apiGetProducts);

export default router;
=======
import express, { Router } from "express";
import * as productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/search", productsController.searchProducts);
router.get("/:id", productsController.getProductById);

export default router;
>>>>>>> 3691c344d172ccb9191d1ec3056bedcccf58f169
