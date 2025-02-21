const Posts = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Posts.createPost(title, content);
    res.status(201).json({ ...newPost, verificationCode: "uniqueCode123" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts };
