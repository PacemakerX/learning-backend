const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Recevied a request");
  res.send({
    message: "Hello from the server How are yoou dooing?",
    anotherMessage: "This is another message from the server",
  });
});

router.put("/", (req, res) => {
  res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <title>Updated Content</title>
                    </head>
                    <body>
                            <h1>${res.customData} </h1>
                            <h1>Content Updated</h1>
                    </body>
                    </html>
            `);
});

module.exports = router;
