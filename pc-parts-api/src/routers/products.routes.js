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