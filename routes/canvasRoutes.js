const express = require("express");
const router = express.Router();
const {getAllCanvases,createCanvas,deleteCanvas} = require("../controllers/canvasController");
const authenticate = require("../middlewares/authentication");

router.get("/", authenticate, getAllCanvases);
router.post("/create", authenticate, createCanvas);
router.get("/delete", authenticate, deleteCanvas);

module.exports = router;
