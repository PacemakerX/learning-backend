const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers } = require("../controllers/userController");

router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.get("/login", (req, res) => {
    loginUser(req, res);
});

router.get("/", (req, res) => {
    getUsers(req, res);
});

module.exports = router;
