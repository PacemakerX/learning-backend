const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Got a new Request");
  let response = "";
  if (req.url === "/") response = "hello world";
  else if (req.url === "/home") response = "Welcome to Home page";
  else if (req.url === "/about") response = "Welcome to about page";
  else response = "Page not found";
  res.write(response);
  res.end();
});
server.listen(3030, () => {
  console.log("server is listening on port 3000");
});
