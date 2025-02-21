const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "test",
  }
);

postSchema.statics.createPost = async function (title, content) {
  try {
    const post = new this({
      title,
      content,
    });
    const newPost = await post.save();
    return newPost;
  } catch (error) {
    throw new Error("Error creating post" + error.message);
  }
};

postSchema.statics.getPosts = async function () {
  try {
    const posts = await this.find();
    return posts;
  } catch (error) {
    throw new Error("Error getting posts: " + error.message);
  }
};

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
