const express = require("express");
const app = express();
const port = 3030;
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const mainRoutes = require("./mainRoutes");

app.use("/", mainRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
