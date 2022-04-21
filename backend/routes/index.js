const { cors } = require("./middleware/cors");
const { User } = require("./User");
const { Refresh } = require("./Refresh");
const { Diary } = require("./Diary");
const { NotFound } = require("./NotFound");

const router = async (req, res) => {
  const resultCors = await cors(req, res);
  if (resultCors) {
    if (req.url.startsWith("/refresh")) await Refresh(req, res);
    else if (req.url.startsWith("/user")) await User(req, res);
    else if (req.url.startsWith("/diary")) Diary(req, res);
    else NotFound(req, res);
  } else {
    // 해당 요청은 수행할 수 없습니다.
  }
};

module.exports = {
  router,
};
