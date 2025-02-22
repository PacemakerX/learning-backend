const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "protonmail.com",
  ];

  const match = email.match(emailRegex);
  return match ? allowedDomains.includes(match[1]) : false;
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

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
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    // Validate password strength
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
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
