const { authentication } = require("../middleware/token");
const { isValidDate, isValidDiary } = require("./util");
const { diaryAnalysis } = require("../middleware/diaryAnalysis");
const { connect } = require("../../models");
const { selectDiary, updateDiaryTitleContent } = require("../../models/diary");
const { updateDiaryEmotion, selectDiaryEmotion } = require("../../models/diaryEmotion");

const Update = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const [resultValidDiary] = isValidDate(req, res);
  const diaryDate = req.url.match(/\d{8}$/)[0];

  if (resultAuth && resultValidDiary) {
    const [resultSelectDiary, dataSelectDiary] = await selectDiary(connect(), {
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
        const resultValid = isValidDiary(res, parsePayload.title, parsePayload.content);
        if (resultValid) {
          const data = {
            uid: dataAuth.id,
            diaryDate: parseInt(diaryDate),
            updatedAt: new Date(),
          };
          // Compare prev title & content
          let resultDiaryAnalysis = null;
          let dataDiaryAnalysis = null;
          // if (parsePayload.title !== dataSelectDiary.diary.title)
          data["title"] = parsePayload.title;
          // if (parsePayload.content !== dataSelectDiary.diary.content) {
          data["content"] = parsePayload.content;
          [resultDiaryAnalysis, dataDiaryAnalysis] = await diaryAnalysis(
            parsePayload.content
          );
          // }
          let resultUpdateEmotion = true;
          if (resultDiaryAnalysis) {
            [resultUpdateEmotion] = await updateDiaryEmotion(connect(), {
              ...data,
              ...dataDiaryAnalysis,
            });
          }
          const [resultUpdate, dataUpdate] = await updateDiaryTitleContent(
            connect(),
            data
          );
          const [resultSelectDiaryEmotion, dataSelectDiaryEmotion] =
            await selectDiaryEmotion(connect(), {
              diaryId: dataSelectDiary.diary.id,
            });
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          if (resultUpdate && resultUpdateEmotion) {
            res.end(
              JSON.stringify({
                result: true,
                data: {
                  diary: {
                    diaryId: dataSelectDiaryEmotion.diaryEmotion.diaryId,
                    emotion: {
                      positive: dataSelectDiaryEmotion.diaryEmotion.positive,
                      negative: dataSelectDiaryEmotion.diaryEmotion.negative,
                      neutral: dataSelectDiaryEmotion.diaryEmotion.neutral,
                      topEmotion: dataSelectDiaryEmotion.diaryEmotion.topEmotion,
                    },
                  },
                },
              })
            );
          } else {
            res.end(JSON.stringify({ result: false, data: dataUpdate }));
          }
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
