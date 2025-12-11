import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const DB_NAME = "ensolver_test_db";

// JWT Constants should be set in environment variables for security
export const connectionString = `mongodb+srv://usertest:usertest@cluster0.hfok7hc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
export const JWT_SECRET =
  process.env.JWT_SECRET || "d75206a9b4d8e4263fb11c44bb5ffc9b";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 8000;
