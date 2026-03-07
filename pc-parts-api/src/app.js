import express from "express";
import path from "path";
<<<<<<< HEAD
import productsRoutes from "./routers/products.routes.js";
=======
import cors from "cors";
import productsRoutes from "./routers/products.routes.js";
import pagesRoutes from "./routers/pages.routes.js";
>>>>>>> 3691c344d172ccb9191d1ec3056bedcccf58f169

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
<<<<<<< HEAD

=======
>>>>>>> 3691c344d172ccb9191d1ec3056bedcccf58f169

//static directories
app.use(express.static(path.join(process.cwd(), "public")));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routers
<<<<<<< HEAD
app.use(productsRoutes);
=======
app.use("/api/products", productsRoutes);
app.use("/", pagesRoutes);
>>>>>>> 3691c344d172ccb9191d1ec3056bedcccf58f169

export default app;
