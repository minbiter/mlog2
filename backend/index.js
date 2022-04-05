const http = require("http");
const app = require("./app");

http
  .createServer(async (req, res) => {
    app.config(req, res);
  })
  .listen(8082, () => {
    console.log("Server Running at localhost:8082");
  });
