const { connect } = require("../../models");
const { selectSurveyMusic } = require("../../models/surveyMusic");

const Fetch = async (req, res) => {
  const [resultSelectSurvey, dataSelectSurvey] = await selectSurveyMusic(connect());
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (resultSelectSurvey) {
    res.end(JSON.stringify({ result: true, data: dataSelectSurvey }));
  } else {
    res.end(JSON.stringify({ result: false, data: dataSelectSurvey }));
  }
};
/*
요청
{
  "neutral": [3550, 3556, 3559],
  "positive": [3551, 3562, 3553],
  "negative": [3561, 3552, 3560]
}
*/
module.exports = {
  Fetch,
};
