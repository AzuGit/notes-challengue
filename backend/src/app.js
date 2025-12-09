import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

//app routes and middlewares

app.use("/api/v1/users", userRoutes);

export default app;
