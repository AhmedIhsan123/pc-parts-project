import express from "express";
import fetch from "node-fetch";

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

app.get("/products/:id", async (req, res) => {

	const id = req.params.id;

	try {

		const response = await fetch(`http://localhost:8001/api/products/${id}`);
		const product = await response.json();

		res.render("products-page/product-detail", {
			product
		});

	} catch (error) {
		console.error(error);
		res.status(500).send("Error loading product");
	}

});
// Catch-all LAST
app.get("/", (req, res) => {
	res.render("landing-page/landing.ejs");
});

export default app;