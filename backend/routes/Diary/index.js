const { Create } = require("./create");
const { Read } = require("./read");
const { Update } = require("./update");
const { Delete } = require("./delete");
const { NotFound } = require("../NotFound");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Diary = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  // Diary CRUD.
  if (url.pathname.match(/^\/diary\/\d+\/\d{8}$/)) {
    if (req.method === "GET") {
      console.log("ReadDiary");
      await Read(req, res);
    } else if (req.method === "POST") {
      console.log("CreateDiary");
      await Create(req, res);
    } else if (req.method === "PUT") {
      console.log("UpdateDiary");
      await Update(req, res);
    } else if (req.method === "DELETE") {
      console.log("DeleteDiary");
      await Delete(req, res);
    }
  } else {
    NotFound(req, res);
  }
};

module.exports = {
  Diary,
};
