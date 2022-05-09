const { selectUser } = require("../../models/user");
const { connect } = require("../../models");
const isSurvey = async (req, res, id) => {
  const [resultSelectUser, dataSelectUser] = await selectUser(await connect(), { id });
  if (resultSelectUser && dataSelectUser.user.isSurvey) {
    return true;
  } else {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({ result: false, data: { survey: "설문조사 이후에 가능합니다." } })
    );
  }
};

module.exports = {
  isSurvey,
};
