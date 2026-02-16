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

export default app;
