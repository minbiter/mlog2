const { genreId } = require("../../models/util/musicApi");

const isValidSurvey = (data) => {
  if (
    data.neutral &&
    data.positive &&
    data.negative &&
    data.neutral.length >= 3 &&
    data.positive.length >= 3 &&
    data.negative.length >= 3
  ) {
    return [true];
  } else {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        result: false,
        data: { survey: "감정마다 최소 3개 이상 음악을 선택해주세요." },
      })
    );
    return [false];
  }
};

const createQuerySurveyList = (id, data) => {
  const querySurveyList = {};
  for (const key in genreId) {
    querySurveyList[genreId[key]] = {
      uid: id,
      genreId: genreId[key],
      topEmotion: "",
      neutral: 0,
      positive: 0,
      negative: 0,
    };
  }
  for (const sentiment in data) {
    for (const genre of data[sentiment]) {
      querySurveyList[`${genre}`].topEmotion = sentiment;
      querySurveyList[`${genre}`][`${sentiment}`] = 10;
    }
  }
  return querySurveyList;
};

module.exports = {
  isValidSurvey,
  createQuerySurveyList,
};
