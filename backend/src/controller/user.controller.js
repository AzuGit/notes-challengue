import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check required fields

    if (!name) {
      return res.status(400).json({ error: true, message: "Name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        message: "Password must be at least 6 characters long",
      });
    }
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "User already exists" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    //save user to database

    const savedUser = await newUser.save();
    if (!savedUser) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to create user at database" });
    }

    //generate token
    const token = generateToken(savedUser, res);

    //respond with success
    res.status(201).json({
      message: "User created successfully",
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      error: false,
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: true, message: "Internal server error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check required fields
    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    //compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password",
        isPasswordValid: isPasswordValid,
      });
    }

    //generate token
    const token = generateToken(user, res);

    //respond with success
    res.status(200).json({
      message: "Login successful",
      useremail: user.email,
      id: user._id,
      error: false,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    //find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //logout successful clearing cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { createUser, loginUser, logoutUser };
