const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Every canvas must have an owner
    },
    name: {
      type: String,
      required: true,
      default: "Untitled Canvas",
    },
    elements: [
      {
        type: [mongoose.Schema.Types.Mixed],
      },
    ],
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // List of user IDs the canvas is shared with
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

canvasSchema.statics.getAllCanvases = async function (email) {
  try {
    const user = await mongoose.model("User").findOne({ email });
    if (!user) {
      return [];
    }
    const canvases = await this.find({
      $or: [{ owner: user._id }, { sharedWith: user._id }],
    });
    return canvases;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a canvass for a uusesr with given email

canvasSchema.statics.createCanvas = async function (email, name) {
  try {
    const user = await mongoose.model("User").findOne(({ email }));
    if (!user) {
      throw new Error("User not found");
    }
    const canvas = new this({
      owner: user._id,
      name,
      elements: [],
      sharedWith: [],
    });
    const newCanvas = await canvas.save();
    return newCanvas;
  } catch (error) {
    throw new Error(error.message);
  }
};

canvasSchema.statics.deleteCanvas = async function (email, canvasName) {
  try {
    // Fetch the canvas with the given name
    const canvas = await this.findOne({ name: canvasName });

    if (!canvas) {
      throw new Error("Canvas not found");
    }

    // Ensure that the requester is the owner
    const user = await mongoose.model("User").findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (!canvas.owner.equals(user._id)) {
      throw new Error("Unauthorized: Only the owner can delete this canvas");
    }

    // Delete the canvas if ownership is verified
    await canvas.deleteOne();

    return { message: "Canvas deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};


const Canvas = mongoose.model("Canvas", canvasSchema);

module.exports = Canvas;
