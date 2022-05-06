const { authentication } = require("../middleware/token");
const { isValidDiary } = require("./util");
const { diaryAnalysis } = require("../middleware/diaryAnalysis");
const { connect } = require("../../models");
const { selectDiary, updateDiaryTitleContent } = require("../../models/diary");
const { updateDiaryEmotion } = require("../../models/diaryEmotion");

const Update = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const [resultValidDiary] = isValidDiary(req, res);
  const diaryDate = req.url.match(/\d{8}$/)[0];

  if (resultAuth && resultValidDiary) {
    const [resultSelectDiary, dataSelectDiary] = await selectDiary(await connect(), {
      uid: dataAuth.id,
      diaryDate: parseInt(diaryDate),
    });
    if (resultSelectDiary) {
      let payload = "";

      req.on("data", (data) => {
        payload += data;
      });

      req.on("end", async () => {
        const parsePayload = JSON.parse(payload);
        const data = {
          uid: dataAuth.id,
          diaryDate: parseInt(diaryDate),
          updatedAt: new Date(),
        };
        // Compare prev title & content
        let resultDiaryAnalysis = null;
        let dataDiaryAnalysis = null;
        if (parsePayload.title !== dataSelectDiary.title)
          data["title"] = parsePayload.title;
        if (parsePayload.content !== dataSelectDiary.content) {
          data["content"] = parsePayload.content;
          [resultDiaryAnalysis, dataDiaryAnalysis] = await diaryAnalysis(
            parsePayload.content
          );
        }
        let resultUpdateEmotion = true;
        if (resultDiaryAnalysis) {
          [resultUpdateEmotion] = await updateDiaryEmotion(await connect(), {
            ...data,
            ...dataDiaryAnalysis,
          });
        }
        const [resultUpdate, dataUpdate] = await updateDiaryTitleContent(
          await connect(),
          data
        );

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (resultUpdate && resultUpdateEmotion) {
          res.end(JSON.stringify({ result: true, data: dataUpdate }));
        } else {
          res.end(JSON.stringify({ result: false, data: dataUpdate }));
        }
      });
    } else {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          result: false,
          data: { diary: "해당 날짜에 일기가 존재하지 않습니다." },
        })
      );
    }
  }
};

module.exports = {
  Update,
};
