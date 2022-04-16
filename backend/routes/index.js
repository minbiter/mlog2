const { Refresh } = require("./Refresh");
const { User } = require("./User");
const { cors } = require("./middleware/cors");

const router = async (req, res) => {
  const resultCors = await cors(req, res);
  if (resultCors) {
    if (req.url.startsWith("/refresh")) await Refresh(req, res);
    else if (req.url.startsWith("/user")) await User(req, res);
    // else NotFound(req, res);
  } else {
    // 해당 요청은 수행할 수 없습니다.
  }
};

module.exports = {
  router,
};
