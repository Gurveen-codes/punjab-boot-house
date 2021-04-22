import express from "express";
import colors from "colors";
const app = express();
import dotenv from "dotenv";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

app.use(express.json()); ///Accept json data in req body

app.get("/", (req, res) => {
	res.send("Backend API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);

app.get("/api/paypal/config", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

app.listen(
	process.env.PORT || 5000,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`
			.yellow
	)
);
