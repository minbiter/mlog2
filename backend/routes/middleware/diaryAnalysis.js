const axios = require("axios");

const diaryAnalysis = async (diary) => {
  const diaryAnalysisURL = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.NATURAL_LANGUAGE_API_KEY}`;
  const diaryArray = diary.split(".");
  const diaryAnalysisPromiseAll = [
    axios.create({
      baseURL: diaryAnalysisURL,
      headers: { "Content-Type": "application/json" },
    }),
  ];
  const requestDataArray = [diary];
  for (const sentence of diaryArray) {
    if (sentence !== "") {
      diaryAnalysisPromiseAll.push(
        axios.create({
          baseURL: diaryAnalysisURL,
          headers: { "Content-Type": "application/json" },
        })
      );
      requestDataArray.push(sentence);
    }
  }

  try {
    const dataList = await Promise.all(
      Array.from(diaryAnalysisPromiseAll, (v, i) =>
        v.post("", {
          document: {
            type: "PLAIN_TEXT",
            content: requestDataArray[i],
          },
          encodingType: "UTF8",
        })
      )
    );
    const result = [true];
    const resultData = { positive: 0, negative: 0, neutral: 0, topEmotion: "" };
    resultData.topEmotion =
      dataList[0].data.documentSentiment.score >= 0.4
        ? "positive"
        : dataList[0].data.documentSentiment.score <= -0.3
        ? "negative"
        : "neutral";
    dataList.shift();
    for (const {
      data: {
        documentSentiment: { score },
      },
    } of dataList) {
      if (score >= 0.4) {
        ++resultData.positive;
      } else if (score <= -0.3) {
        ++resultData.negative;
      } else {
        ++resultData.neutral;
      }
    }
    return [true, resultData];
  } catch (err) {
    return [false, { diary: "AI 감정 분석에 실패했습니다." }];
  }
};

module.exports = {
  diaryAnalysis,
};
