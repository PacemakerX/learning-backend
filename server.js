const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Got a new Request");
  res.write("hello");
  res.end();
}); // a server is created, now we have  to make it listen to PORTS, which room are we talking about in an room,

server.listen(3030, () => {
  console.log("server is listening on port 3000");
});
