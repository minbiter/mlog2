const { CreateDiary } = require("./createDiary");
const { ReadDiary } = require("./readDiary");
const { NotFound } = require("../NotFound");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Diary = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  // Diary CRUD.
  if (url.pathname.match(/^\/diary\/\d+\/\d{8}$/)) {
    if (req.method === "GET") {
      console.log("ReadDiary");
      await ReadDiary(req, res);
    } else if (req.method === "POST") {
      console.log("CreateDiary");
      await CreateDiary(req, res);
    }
  } else {
    NotFound(req, res);
  }
};

module.exports = {
  Diary,
};
