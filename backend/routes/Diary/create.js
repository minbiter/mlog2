const { authentication } = require("../middleware/token");
const { diaryAnalysis } = require("../middleware/diaryAnalysis");
const { connect } = require("../../models");
const { selectDiary, insertDiary } = require("../../models/diary");
const { insertDiaryEmotion } = require("../../models/diaryEmotion");
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
        const [resultDiaryAnalysis, dataDiaryAnalysis] = await diaryAnalysis(
          parsePayload.content
        );
        if (resultDiaryAnalysis) {
          const queryDiary = {
            uid: dataAuth.id,
            diaryDate: parseInt(diaryDate),
            title: parsePayload.title,
            content: parsePayload.content,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          const [resultInsertDiary, dataInsertDiary] = await insertDiary(
            await connect(),
            queryDiary
          );
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          if (resultInsertDiary) {
            const queryDiaryEmotion = {
              diaryId: dataInsertDiary.diary.diaryId,
              emotion: dataDiaryAnalysis,
            };
            const [resultInsertDiaryEmotion, dataInsertDiaryEmotion] =
              await insertDiaryEmotion(await connect(), queryDiaryEmotion);
            if (resultInsertDiaryEmotion) {
              res.end(
                JSON.stringify({
                  result: true,
                  data: {
                    diary: {
                      diaryId: dataInsertDiary.diary.diaryId,
                      emotion: dataDiaryAnalysis,
                    },
                  },
                })
              );
            } else {
              res.end(JSON.stringify({ result: false, data: dataInsertDiaryEmotion }));
            }
          } else {
            res.end(JSON.stringify({ result: false, data: dataInsertDiary }));
          }
        } else {
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ result: false, data: dataDiaryAnalysis }));
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
