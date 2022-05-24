const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { selectMusic } = require("../../models/diary");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Fetch = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    // positive, negative, neutral, null
    const playList = req.url.match(/(positive|negative|neutral)/);
    const dataSelectMusic = await selectMusic(connect(), {
      uid: dataAuth.id,
      topEmotion: playList ? playList[0] : null,
    });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ result: true, data: dataSelectMusic }));
  }
};

module.exports = {
  Fetch,
};
