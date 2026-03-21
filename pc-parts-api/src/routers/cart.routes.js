import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authorizeAPI } from "../controllers/products.controller.js";

const router = express.Router();

// GET  /api/cart                  — fetch current session cart
router.get("/", authorizeAPI, cartController.getCart);

// POST /api/cart/items            — add item (or increment qty)
router.post("/items", authorizeAPI, cartController.addItem);

// DELETE /api/cart/items/:productId — remove item entirely
router.delete("/items/:productId", authorizeAPI, cartController.removeItem);

// POST /api/cart/clear            — empty the cart
router.post("/clear", authorizeAPI, cartController.clearCart);

export default router;