const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { selectDiary } = require("../../models/diary");
const { selectDiaryEmotion } = require("../../models/diaryEmotion");
const { selectUserEmotion } = require("../../models/userEmotion");
const { insertDiaryMusic } = require("../../models/diaryMusic");
const { isValidDiary } = require("../Diary/util");

const Create = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const [resultValidDiary] = isValidDiary(req, res);
  if (resultAuth && resultValidDiary) {
    const [resultSelectDiary, dataSelectDiary] = await selectDiary(await connect(), {
      uid: dataAuth.id,
      diaryDate: parseInt(req.url.match(/\d{8}$/)[0]),
    });
    let payload = "";
    req.on("data", (data) => {
      payload += data;
    });
    req.on("end", async () => {
      const parsePayload = JSON.parse(payload);
      // 해당 uid와 diaryDate에 해당되는 diary가 존재하는지 확인 & diary의 column인 isMusic 확인 -> false여야 함.
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (resultSelectDiary && !dataSelectDiary.isMusic) {
        // 다 ok면 해당 음악 diaryMusic에 insert 해주고.
        // 해당 음악의 장르의 userEmotion 테이블에서
        // positive, negative, neutral 변경
        // isMusic true로 설정.
        // diaryEmotion과 userEmotion 가져오기
        const [
          [resultDiaryEmotion, dataDiaryEmotion],
          [resultUserEmotion, dataUserEmotion],
        ] = await Promise.all([
          selectDiaryEmotion(await connect(), { diaryId: dataSelectDiary.diary.id }),
          selectUserEmotion(await connect(), {
            uid: dataAuth.id,
            genreId: parsePayload.genreId,
          }),
        ]);
        if (resultDiaryEmotion && resultUserEmotion) {
          const diaryMusicData = {
            diaryId: dataSelectDiary.diary.id,
            musicId: parsePayload.musicId,
            positive: (
              (dataUserEmotion.userEmotion.positive +
                dataDiaryEmotion.diaryEmotion.positive) /
              (dataUserEmotion.userEmotion.count + 1)
            ).toFixed(),
            negative: (
              (dataUserEmotion.userEmotion.negative +
                dataDiaryEmotion.diaryEmotion.negative) /
              (dataUserEmotion.userEmotion.count + 1)
            ).toFixed(),
            neutral: (
              (dataUserEmotion.userEmotion.neutral +
                dataDiaryEmotion.diaryEmotion.neutral) /
              (dataUserEmotion.userEmotion.count + 1)
            ).toFixed(),
            count: ++dataUserEmotion.userEmotion.count,
            uid: dataAuth.id,
            genreId: parsePayload.genreId,
            diaryDate: parseInt(req.url.match(/\d{8}$/)[0]),
          };
          const [resultInsertDiaryMusic, dataInsertDiaryMusic] = await insertDiaryMusic(
            await connect(),
            diaryMusicData
          );
          if (resultInsertDiaryMusic) {
            res.end(JSON.stringify({ result: true, data: dataInsertDiaryMusic }));
          } else {
            res.end(JSON.stringify({ result: false, data: dataInsertDiaryMusic }));
          }
        } else {
          res.end(
            JSON.stringify({
              result: false,
              data: { diaryMusic: { ...dataDiaryEmotion, ...dataUserEmotion } },
            })
          );
        }
      } else {
        res.end(
          JSON.stringify({
            result: false,
            data: { diaryMusic: "해당 일기는 음악을 선택할 수 없습니다." },
          })
        );
      }
    });
  }
};

module.exports = {
  Create,
};
