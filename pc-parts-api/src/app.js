import express from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import productsRoutes from "./routers/products.routes.js";
import pagesRoutes from "./routers/pages.routes.js";
import authRoutes from "./routers/auth.routes.js";

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

app.use(cors({
    origin: "http://localhost:8002",
    credentials: true
}));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
  }
}));

//routers
app.use("/api/products", productsRoutes);
app.use("/", pagesRoutes);
app.use("/", authRoutes);

export default app;
