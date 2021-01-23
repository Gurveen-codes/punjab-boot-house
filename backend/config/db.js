import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.brightMagenta.bold.underline
    );
  } catch (error) {
    console.log(`Error: ${error}`).red.bold.underline;
    process.exit(1);
  }
};

export default connectDB;
