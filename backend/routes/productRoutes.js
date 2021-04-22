import express from "express";
const router = express.Router();
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";
import { isAdmin, protectRoute } from "../middleware/authMiddleware.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.route("/").get(getProducts);

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
router.route("/").post(protectRoute, isAdmin, createProduct);

// @desc Fetch one product
// @route GET /api/products/:id
// @access Public
router.route("/:id").get(getProductById);

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
router.route("/:id").delete(protectRoute, isAdmin, deleteProduct);

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
router.route("/:id").put(protectRoute, isAdmin, updateProduct);

export default router;
