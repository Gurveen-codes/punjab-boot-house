const express = require("express");
const app = express();
const dotenv = require("dotenv");

const products = require("./data/products");

dotenv.config();

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
