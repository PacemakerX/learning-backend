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

const getUsers = async (req, res) => {
  try {
    const users = await userModels.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers };
