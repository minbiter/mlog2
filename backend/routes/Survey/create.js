const { authentication } = require("../middleware/token");
const { isValidSurvey, createQuerySurveyList } = require("./util");
const { connect } = require("../../models");
const { surveyComplete } = require("../../models/user");
const { insertUserEmotion } = require("../../models/userEmotion");

const Create = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    let payload = "";
    req.on("data", (data) => {
      payload += data;
    });
    req.on("end", async () => {
      const parsePayload = JSON.parse(payload);
      const [resultValidSurvey] = isValidSurvey(parsePayload);
      if (resultValidSurvey) {
        const querySurveyList = createQuerySurveyList(dataAuth.id, parsePayload);
        const [resultInsertUserEmotion, dataInsertUserEmotion] = await insertUserEmotion(
          await connect(),
          querySurveyList
        );
        await surveyComplete(await connect(), { id: dataAuth.id });
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (resultInsertUserEmotion) {
          res.end(JSON.stringify({ result: true, data: dataInsertUserEmotion }));
        } else {
          res.end(JSON.stringify({ result: false, data: dataInsertUserEmotion }));
        }
      }
    });
  }
};

module.exports = {
  Create,
};
