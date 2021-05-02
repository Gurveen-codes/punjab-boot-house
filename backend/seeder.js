import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import connectDb from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDb();

const importData = asyncHandler(async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdusers = await User.insertMany(users);

		const adminUser = createdusers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log("Data imported".brightGreen.bold.underline);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.yellow.bold);
		process.exit(1);
	}
});
const destroyData = asyncHandler(async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data Destroyed".bold.red.underline);
		process.exit();
	} catch (error) {
		console.log(`Error: {error}`.yellow.bold);
		process.exit(1);
	}
});

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
