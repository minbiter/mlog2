const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { deleteDiary } = require("../../models/diary");

const Delete = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const diaryDate = req.url.match(/\d{8}$/)[0];
  if (resultAuth) {
    const data = {
      uid: dataAuth.id,
      diaryDate: parseInt(diaryDate),
    };
    const [resultDeleteDiary, dataDeleteDiary] = await deleteDiary(connect(), data);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (resultDeleteDiary) {
      res.end(JSON.stringify({ result: true, data: dataDeleteDiary }));
    } else {
      res.end(JSON.stringify({ result: false, data: dataDeleteDiary }));
    }
  }
};

module.exports = {
  Delete,
};
