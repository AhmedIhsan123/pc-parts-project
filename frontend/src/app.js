import express from "express";

//configure Express.js app
const app = express();

//view engine
app.set("views", "src/views");

//static directories
app.use(express.static("public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", (req, res) => {
	res.render("landing-page/landing.ejs");
});

export default app;
