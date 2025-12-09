import app from "./app.js";
import connectToDatabase from "./config/dataBase.js";

const startServer = async () => {
  try {
    await connectToDatabase();

    app.on("error", (err) => {
      console.error("Server error:", err);
    });

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
