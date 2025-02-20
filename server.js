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
app.use("/", middleware, mainRoutes);
app.use("/posts", middleware, postRoutes);
app.use("/users", middleware, userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
