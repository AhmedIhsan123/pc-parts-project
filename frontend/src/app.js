import express from "express";

const app = express();

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Specific routes first
app.get("/products", (req, res) => {
	res.render("products-page/products");
});

// Catch-all LAST
app.get("/", (req, res) => {
	res.render("landing-page/landing.ejs");
});

export default app;
