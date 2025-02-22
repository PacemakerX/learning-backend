const userModels = require("../models/userModel");

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
    const user = await userModels.login(email, password);
    res.status(200).json(user);
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