const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3030;
const userRoutes = require("./routes/userRoutes");
const mainRoutes = require("./routes/mainRoutes");
const postRoutes = require("./routes/postRoutes");
const middleware = require("./middlewares/basicMiddle");
const auth = require("./middlewares/auth");

app.use("/", middleware, mainRoutes);
app.use("/posts", middleware, postRoutes);
app.use("/users", auth, userRoutes);
// we will use cors
// app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
