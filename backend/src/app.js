import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import noteRoutes from "./routes/note.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

//app routes and middlewares

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", noteRoutes);

export default app;
