const canvasModel = require("../models/canvasModel");

const getAllCanvases = async (req, res) => {
  const email = req.email;
  try {
    const canvases = await canvasModel.getAllCanvases(email);
    res.status(200).json(canvases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCanvas = async (req, res) => {
  const email = req.email;
  const { name } = req.body;
  try {
    const newCanvas = await canvasModel.createCanvas(email, name);
    res.status(201).json(newCanvas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCanvas = async (req, res) => {
  const email = req.email;
  const { name } = req.body;
  try {
    await canvasModel.deleteCanvas(email, name);
    res.status(200).json({ message: "Canvas deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCanvas = async (req, res) => {
  try {
    const { email, canvasName, newName, sharedEmails } = req.body;

    if (!email || !canvasName) {
      return res
        .status(400)
        .json({ message: "Email and Canvas Name are required" });
    }

    const updatedCanvas = await canvasModel.updateCanvas(
      email,
      canvasName,
      newName,
      sharedEmails
    );
    res.status(200).json(updatedCanvas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCanvases, createCanvas, deleteCanvas, updateCanvas };
