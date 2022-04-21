const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { selectDiary } = require("../../models/diary");

const Read = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const diaryDate = req.url.match(/\d{8}$/)[0];
  const [resultSelectDiary, dataSelectDiary] = await selectDiary(await connect(), {
    uid: dataAuth.id,
    diaryDate,
  });

  if (resultAuth) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (resultSelectDiary) {
      res.end(JSON.stringify({ result: true, data: dataSelectDiary }));
    } else {
      res.end(JSON.stringify({ result: false, data: dataSelectDiary }));
    }
  }
};

module.exports = {
  Read,
};
