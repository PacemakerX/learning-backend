const express = require("express");
const app = express();
const port = 3030;

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
        </html>
    `);
});

app.get("/home", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Home Page</title>
        </head>
        <body>
            <h1>Welcome to Home Page</h1>
        </body>
        </html>
    `);
});

app.get("/about", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>About Us</title>
        </head>
        <body>
            <h1>About Us</h1>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});