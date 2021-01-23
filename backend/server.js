import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import products from "./data/products.js";

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`
  )
);
