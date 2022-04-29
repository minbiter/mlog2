const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { selectDiary, insertDiary } = require("../../models/diary");
const { isValidDiary } = require("./util");

const Create = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const [resultValidDiary] = isValidDiary(req, res);
  const diaryDate = req.url.match(/\d{8}$/)[0];
  if (resultAuth && resultValidDiary) {
    const [resultSelectDiary] = await selectDiary(await connect(), {
      uid: dataAuth.id,
      diaryDate: parseInt(diaryDate),
    });
    if (!resultSelectDiary) {
      let payload = "";
      req.on("data", (data) => {
        payload += data;
      });
      req.on("end", async () => {
        const parsePayload = JSON.parse(payload);
        const data = {
          uid: dataAuth.id,
          diaryDate: parseInt(diaryDate),
          title: parsePayload.title,
          content: parsePayload.content,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const [resultInsertDiary, dataInsertDiary] = await insertDiary(
          await connect(),
          data
        );
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (resultInsertDiary) {
          res.end(JSON.stringify({ result: true, data: dataInsertDiary }));
        } else {
          res.end(JSON.stringify({ result: false, data: dataInsertDiary }));
        }
      });
    } else {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          result: false,
          data: { diary: "이미 등록된 일기가 존재합니다." },
        })
      );
    }
  }
};

module.exports = {
  Create,
};
