const axios = require("axios");

const diaryAnalysis = async (diary) => {
  const diaryAnalysisURL = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.NATURAL_LANGUAGE_API_KEY}`;
  const diaryAnalysisApi = axios.create({
    baseURL: diaryAnalysisURL,
    headers: { "Content-Type": "application/json" },
  });
  const requestData = {
    document: {
      type: "PLAIN_TEXT",
      content: diary,
    },
    encodingType: "UTF8",
  };

  try {
    const {
      data: {
        documentSentiment: { score },
      },
    } = await diaryAnalysisApi.post("", requestData);
    return score >= 0.4
      ? [true, "positive"]
      : score <= -0.3
      ? [true, "negative"]
      : [true, "neutral"];
  } catch (err) {
    return [false, { diary: "AI 감정 분석에 실패했습니다." }];
  }
};

module.exports = {
  diaryAnalysis,
};
