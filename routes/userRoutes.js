const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");

router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.post("/login", (req, res) => {
    loginUser(req, res);
});

router.post("/profile", (req, res) => {
    getUserProfile(req, res);
});

module.exports = router;
