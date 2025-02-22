const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxLengh: 50,
    //   unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    //   unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.register = async function (name, email, password) {
  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email, password });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    return user;
  } catch (error) {
    throw new Error("Error getting user: " + error.message);
  }
};

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw new Error("Error getting users: " + error.message);
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
