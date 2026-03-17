import express from "express";
import * as userController from "../controllers/user.controller.js"

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/logout", userController.logout)
router.get("/auth/check", userController.check);

export default router;