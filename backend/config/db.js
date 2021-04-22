import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
		});

		console.log(
			`MongoDB Connected: ${conn.connection.host}`.brightMagenta.bold
		);
	} catch (error) {
		console.log(`Error : ${error}`.red);
		process.exit(1);
	}
};

export default connectDB;
