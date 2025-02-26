const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const canvasRoutes = require("./routes/canvasRoutes");
const connectToDatabase = require("./db");
connectToDatabase();
app.use(cors());
app.use(express.json());

app.use("/api/post", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/canvas", canvasRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
