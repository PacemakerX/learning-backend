const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Hello User</title>
        </head>
        <body>
            <h1>Hello User</h1>
            <p>Welcome to our website!</p>
        </body>
        </html>
    `);
});

router.put("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Update User</title>
        </head>
        <body>
            <h1>User Updated</h1>
            <p>Your user information has been updated successfully.</p>
        </body>
        </html>
    `);
});

module.exports = router;
