const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

router.put("/", (req, res) => {
    res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <title>Updated Content</title>
                    </head>
                    <body>
                            <h1>Content Updated</h1>
                    </body>
                    </html>
            `);
});

module.exports = router;
