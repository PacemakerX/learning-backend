const express = require("express");
const app = express();
const port = 3030;
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const mainRoutes = require("./mainRoutes");

function middleware(req, res, next) {
  res.customData = "This is custom data";
  next();
}

function authenticate(req, res, next) {
    res.statusCode=401;
    res.send("You are not authenticated");
    next();
}

app.use("/", middleware, mainRoutes);
app.use("/posts", middleware, postRoutes);
app.use("/users", authenticate, userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
