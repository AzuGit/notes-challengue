import { JWT_SECRET } from "../config/constants.js";
import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token; // Check in cookies or Authorization header

  if (!token) {
    return res.status(401).json({ error: true, message: "No token provided" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res
        .status(403)
        .json({ error: true, message: "User not logged in" });
    }

    const user = { userId: decoded.id, email: decoded.email }; // Mock user retrieval
    // Attach user to request object

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};

export default authToken;
