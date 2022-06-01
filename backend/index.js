const http = require("http");
const app = require("./app");
const db = require("./models");

db.config(); // schema 초기화

http
  .createServer(async (req, res) => {
    app.config(req, res);
  })
  .listen(process.env.NODE_ENV ? 80 : 8082, () => {
    if (process.env.NODE_ENV) {
      console.log("Server Running at 3.34.139.150:80");
    } else {
      console.log("Server Running at localhost:8082");
    }
  });
