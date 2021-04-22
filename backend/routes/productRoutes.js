import express from "express";
const router = express.Router();
import {
	deleteProduct,
	getProductById,
	getProducts,
} from "../controllers/productController.js";
import { isAdmin, protectRoute } from "../middleware/authMiddleware.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.route("/").get(getProducts);

// @desc Fetch one product
// @route GET /api/products/:id
// @access Public
router.route("/:id").get(getProductById);

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
router.route("/:id").delete(protectRoute, isAdmin, deleteProduct);

export default router;
