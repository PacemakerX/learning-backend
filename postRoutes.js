const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                        <title>Posts</title>
                </head>
                <body>
                        <h1>Posts</h1>
                        <p>Welcome to the posts page!</p>
                        <div class="post">
                                <h2>Post Title 1</h2>
                                <p>This is the content of the first post.</p>
                        </div>
                        <div class="post">
                                <h2>Post Title 2</h2>
                                <p>This is the content of the second post.</p>
                        </div>
                </body>
                </html>
        `);
});

router.put("/", (req, res) => {
    res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                        <title>Update Post</title>
                </head>
                <body>
                        <h1>Post Updated</h1>
                        <p>Your post has been updated successfully.</p>
                </body>
                </html>
        `);
});

module.exports = router;
