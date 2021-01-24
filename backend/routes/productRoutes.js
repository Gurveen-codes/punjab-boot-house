import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/productModel.js";

// @desc Fetch all products
// @route /api/products
// @access Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch one product
// @route /api/products/:id
// @access Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  })
);

export default router;
