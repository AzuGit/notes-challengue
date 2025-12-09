import mongoose from "mongoose";
import { connectionString } from "./constants.js";

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log("Connected to MongoDB:", connection.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
