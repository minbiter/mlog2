const { cors } = require("./middleware/cors");
const { User } = require("./User");
const { Refresh } = require("./Refresh");
const { Diary } = require("./Diary");
const { Survey } = require("./Survey");
const { DiaryMusic } = require("./DiaryMusic");
const { Music } = require("./Music");
const { NotFound } = require("./NotFound");

const router = async (req, res) => {
  const resultCors = await cors(req, res);
  if (resultCors) {
    if (req.url.startsWith("/refresh")) await Refresh(req, res);
    else if (req.url.startsWith("/user")) await User(req, res);
    else if (req.url.startsWith("/diary-music")) await DiaryMusic(req, res);
    else if (req.url.startsWith("/diary")) await Diary(req, res);
    else if (req.url.startsWith("/survey")) await Survey(req, res);
    else if (req.url.startsWith("/music")) await Music(req, res);
    else NotFound(req, res);
  } else {
    // 해당 요청은 수행할 수 없습니다.
  }
};

module.exports = {
  router,
};
