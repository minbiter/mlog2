const { Fetch } = require("./fetch");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Music = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  if (req.method === "GET") {
    console.log("FetchMusic");
    await Fetch(req, res);
  }
};

module.exports = {
  Music,
};
