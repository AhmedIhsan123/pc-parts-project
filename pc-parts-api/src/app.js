import express from "express";
import path from "path";
import cors from "cors";
import productsRoutes from "./routers/products.routes.js";

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

//static directories
app.use(express.static(path.join(process.cwd(), "public")));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routers
app.use("/api/products", productsRoutes);

export default app;
