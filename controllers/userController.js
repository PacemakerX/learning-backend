const userModels = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "my Secret";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userModels.register(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid login credentials");
    }
    const user = await userModels.login(email, password);
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token format." });
    }

    // Extract token from Authorization header
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch user details using email
    const user = await userModels.getUser({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token." });
  }
};

module.exports = getUserProfile;

module.exports = { registerUser, loginUser, getUserProfile };
