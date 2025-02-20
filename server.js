const express = require("express");
const app = express();
const port = 3030;
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Hello World</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
        </html>s
    `);
});

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
