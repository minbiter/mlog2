const { authentication } = require("../middleware/token");
const { isValidDiary } = require("../Diary/util");
const { connect } = require("../../models");
const { selectDiary } = require("../../models/diary");
const { selectDiaryEmotion } = require("../../models/diaryEmotion");
const { selectAllUserEmotion } = require("../../models/userEmotion");
const { selectRecommendMusic } = require("../../models/music");

const Recommend = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  const [resultValidDiary] = isValidDiary(req, res);
  if (resultAuth && resultValidDiary) {
    const [resultSelectDiary, dataSelectDiary] = await selectDiary(await connect(), {
      uid: dataAuth.id,
      diaryDate: parseInt(req.url.match(/\d{8}$/)[0]),
    });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    // 해당 uid와 diaryDate에 해당되는 diary가 존재하는지 확인 & isMusic 확인 -> false여야 함.
    if (resultSelectDiary && !dataSelectDiary.isMusic) {
      // diaryEmotion 과 userEmotion 가져오고
      const [
        [resultDiaryEmotion, dataDiaryEmotion],
        [resultUserEmotion, dataUserEmotion],
      ] = await Promise.all([
        selectDiaryEmotion(await connect(), { diaryId: dataSelectDiary.diary.id }),
        selectAllUserEmotion(await connect(), {
          uid: dataAuth.id,
        }),
      ]);
      // 코사인 유사도 검사해서 topEmotion에서 유사도 높은거 3개 추천: recommend
      // 그리고 topEmotion이 아닌 다른 장르에서 유사도 낮은거 2개 추천: addRecommend
      const topEmotion = dataDiaryEmotion.diaryEmotion.topEmotion;
      const vectorA = [
        dataDiaryEmotion.diaryEmotion.positive,
        dataDiaryEmotion.diaryEmotion.negative,
        dataDiaryEmotion.diaryEmotion.neutral,
      ];
      const similarityListA = [];
      const similarityListB = [];
      for (const userEmotion of dataUserEmotion.userEmotion) {
        if (userEmotion.topEmotion === topEmotion) {
          similarityListA.push([
            userEmotion.genreId,
            calculateSimilar(vectorA, [
              userEmotion.positive,
              userEmotion.negative,
              userEmotion.neutral,
            ]),
          ]);
        } else {
          similarityListB.push([
            userEmotion.genreId,
            calculateSimilar(vectorA, [
              userEmotion.positive,
              userEmotion.negative,
              userEmotion.neutral,
            ]),
          ]);
        }
      }
      // similarity 정렬
      similarityListA.sort((a, b) => a[1] - b[1]);
      similarityListB.sort((a, b) => b[1] - a[1]);
      const musicDataList = await Promise.all([
        selectRecommendMusic(await connect(), similarityListA[0][0]),
        selectRecommendMusic(await connect(), similarityListA[1][0]),
        selectRecommendMusic(await connect(), similarityListA[2][0]),
        selectRecommendMusic(await connect(), similarityListB[0][0]),
        selectRecommendMusic(await connect(), similarityListB[1][0]),
      ]);
      res.end(
        JSON.stringify({
          result: true,
          data: {
            diaryMusic: {
              recommend: [musicDataList[0], musicDataList[1], musicDataList[2]],
              addRecommend: [musicDataList[3], musicDataList[4]],
            },
          },
        })
      );
    } else {
      res.end(
        JSON.stringify({
          result: false,
          data: { diaryMusic: "해당 일기는 음악을 선택할 수 없습니다." },
        })
      );
    }
  }
};

// 코사인유사도 계산 함수
function calculateSimilar(vectorA, vectorB) {
  let numeratorA = 0;
  let numeratorB = 0;
  let denominator = 0;
  for (let i = 0; i < 3; i++) {
    denominator += vectorA[i] * vectorB[i];
  }
  for (let i = 0; i < 3; i++) {
    numeratorA += Math.pow(vectorA[i], 2);
    numeratorB += Math.pow(vectorB[i], 2);
  }
  return denominator / (Math.sqrt(numeratorA) * Math.sqrt(numeratorB));
}

module.exports = {
  Recommend,
};
