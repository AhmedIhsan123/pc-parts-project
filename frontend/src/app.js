import express from "express";
import fetch from "node-fetch";

const app = express();

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requireAuth = async (req, res, next) => {
    try {
        // We forward the cookie from the user's request to the API
        const response = await fetch(`http://localhost:8001/auth/check`, {
            headers: { cookie: req.headers.cookie || "" }
        });

        if (response.ok) { return next(); } // User is logged in, proceed to the page 
        
        // Not logged in? Redirect to login page
        return res.redirect("/login");
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.redirect("/login");
    }
};

// Specific routes first
app.get("/login", (req, res) => {
  res.render("login-page/login", {
        title: "Login",
        errors: req.query.errors || null
    });
});

app.get("/register", (req, res) => {
  res.render("login-page/register", {
        title: "Register",
        errors: req.query.errors || null
    });
});

app.get("/products", requireAuth, (req, res) => {
	res.render("products-page/products");
});

app.get("/products/:id", requireAuth, async (req, res) => {
	const id = req.params.id;
	try {
		const response = await fetch(`http://localhost:8001/api/products/${id}`);
		const product = await response.json();

		res.render("products-page/product-detail", { product });
	} catch (error) {
		console.error(error);
		res.status(500).send("Error loading product");
	}

});

app.get("/checkout", (req, res) => {
	res.render("checkout-page/checkout");
});

// Catch-all LAST
app.get("/", (req, res) => {
	res.render("landing-page/landing.ejs");
});

export default app;