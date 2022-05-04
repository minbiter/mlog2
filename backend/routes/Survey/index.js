const { Fetch } = require("./fetch");
const { Create } = require("./create");
const { Update } = require("./update");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Survey = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  if (url.pathname === "/survey") {
    if (req.method === "GET") {
      console.log("Fetch: surveyList 불러오기");
    } else if (req.method === "POST") {
      console.log("Create: User Emotion 생성");
      await Create(req, res);
    } else if (req.method === "PUT") {
      console.log("Update: User Emotion 수정");
      await Update(req, res);
    }
  }
};

module.exports = {
  Survey,
};
