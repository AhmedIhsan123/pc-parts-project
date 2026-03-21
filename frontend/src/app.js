import express from "express";
import fetch from "node-fetch";

const app = express();

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const setLocals = async (req, res, next) => {
	try {
		const response = await fetch(`http://localhost:8001/auth/check`, {
			headers: { cookie: req.headers.cookie || "" },
		});
		res.locals.user = response.ok ? (await response.json()).user : null;
	} catch {
		res.locals.user = null;
	}
	next();
};

app.use(setLocals);

const requireAuth = async (req, res, next) => {
	try {
		const response = await fetch(`http://localhost:8001/auth/check`, {
			headers: { cookie: req.headers.cookie || "" },
		});

		if (response.ok) return next();

		return res.redirect("/login");
	} catch (error) {
		console.error("Auth middleware error:", error);
		return res.redirect("/login");
	}
};

// Specific routes first
app.get("/login", (req, res) => {
	res.render("login-register-page/login-register", {
		title: "Login",
		errors: req.query.errors || null,
	});
});

app.get("/register", (req, res) => {
	res.render("login-register-page/login-register", {
		title: "Register",
		errors: req.query.errors || null,
	});
});

app.get("/products", requireAuth, (req, res) => {
	res.render("products-page/products");
});

app.get("/products/:id", requireAuth, async (req, res) => {
	const id = req.params.id;
	try {
		const response = await fetch((`http://localhost:8001/api/products/${id}`), { credentials: "include" });
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
