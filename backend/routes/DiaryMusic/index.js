const { Recommend } = require("./recommend");
const { Create } = require("./create");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const DiaryMusic = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  if (url.pathname.match(/^\/diary-music\/\d{8}$/)) {
    if (req.method === "GET") {
      console.log("Recommend: 추천 Music 불러오기");
      await Recommend(req, res);
    } else if (req.method === "POST") {
      console.log("Create: diaryMusic 생성");
      await Create(req, res);
    }
  }
};

module.exports = {
  DiaryMusic,
};
