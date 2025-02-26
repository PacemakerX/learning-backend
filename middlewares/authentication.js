const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization failed - No token provided" });
    }

    // Extract token safely
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authorization failed - Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Attach user info to request
    req.email = decoded.email; // Assuming token contains 'email'

    next(); // Proceed to next middleware
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticate;
