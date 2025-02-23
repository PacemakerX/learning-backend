const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxLengh: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format.");
    }

    // Validate password strength
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error(
        "Weak password. It must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new this({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

userSchema.statics.login = async function (email, password) {
  try {

    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isStrongPasswordValid= await bcrypt.compare(password, user.password);
    if (!isStrongPasswordValid) {
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
