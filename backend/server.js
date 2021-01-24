import express from "express";
const app = express();
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/api/products", productRoutes);

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`
      .rainbow.underline
  )
);
