import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

// @desc Fetch all products
// @route /api/products
// @access Public

router.route("/").get(getProducts);

// @desc Fetch one product
// @route /api/products/:id
// @access Public

router.route("/:id").get(getProductById);

export default router;
