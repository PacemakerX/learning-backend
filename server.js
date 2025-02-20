const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Got a new Request");
  let response = "";

  if (req.method === "GET") {
    if (req.url === "/") response = "hello world";
    else if (req.url === "/home") response = "Welcome to Home page";
    else if (req.url === "/about") response = "Welcome to about page";
    else response = "Page not found";
  } else if (req.method === "POST") {
    if (req.url === "/submit") response = "Data submitted successfully";
    else response = "Page not found";
  } else {
    response = "Method not allowed";
  }
  res.write(response);
  res.end();
});
// but this is very cluttered way to write code and not maintainable so we use express.js
server.listen(3030, () => {
  console.log("server is listening on port 3000");
});
