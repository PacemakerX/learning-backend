const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;
const userRoutes = require("./routes/userRoutes");
const mainRoutes = require("./routes/mainRoutes");
const postRoutes = require("./routes/postRoutes");
const middleware = require("./middlewares/basicMiddle");
const auth = require("./middlewares/auth");
const connectToDatabase = require("./db");
connectToDatabase();
app.use(cors());
app.use(express.json());

app.use("/api/post",middleware, postRoutes);
app.use("/", middleware, mainRoutes);
// app.use("/users", auth, userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
