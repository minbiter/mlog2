const { authentication } = require("../middleware/token");
const { isValidSurvey, createQuerySurveyList } = require("./util");
const { connect } = require("../../models");
const { insertUserEmotion, deleteUserEmotion } = require("../../models/userEmotion");

const Update = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    let payload = "";
    req.on("data", (data) => {
      payload += data;
    });
    req.on("end", async () => {
      const parsePayload = JSON.parse(payload);
      const [resultValidSurvey] = isValidSurvey(parsePayload);
      const [resultDeleteUserEmotion, dataDeleteUserEmotion] = await deleteUserEmotion(
        await connect(),
        { uid: dataAuth.id }
      );
      if (resultValidSurvey && resultDeleteUserEmotion) {
        const querySurveyList = createQuerySurveyList(dataAuth.id, parsePayload);
        const [resultInsertUserEmotion, dataInsertUserEmotion] = await insertUserEmotion(
          await connect(),
          querySurveyList
        );
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (resultInsertUserEmotion) {
          res.end(JSON.stringify({ result: true, data: dataDeleteUserEmotion }));
        } else {
          res.end(JSON.stringify({ result: false, data: dataDeleteUserEmotion }));
        }
      } else {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ result: false, data: dataDeleteUserEmotion }));
      }
    });
  }
};

module.exports = {
  Update,
};
