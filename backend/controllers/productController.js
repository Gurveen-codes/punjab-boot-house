import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch one product
// @route /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not Found");
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "Product Deleted successfully" });
	} else {
		res.status(404);
		throw new Error("Product do not exist");
	}
});

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample Name",
		image: "/images/sample.jpg",
		description: "Sample Description",
		brand: "Sample Brand",
		category: "Sample Category",
		price: 0,
		countInStock: 0,
		user: req.user,
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = req.body.name || product.name;
		product.price = req.body.price || product.price;
		product.image = req.body.image || product.image;
		product.description = req.body.description || product.description;
		product.brand = req.body.brand || product.brand;
		product.category = req.body.category || product.category;
		product.countInStock = req.body.countInStock || product.countInStock;

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
};
