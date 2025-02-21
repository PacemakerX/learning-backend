const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/postController");

router.get("/", (req, res) => {
  getPosts(req, res);
});

router.post("/", (req, res) => {
  createPost(req, res); 
});

module.exports = router;
