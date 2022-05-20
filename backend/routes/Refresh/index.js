const { createAccessToken, verifyRefreshToken } = require("./../middleware/token");
const { connect } = require("../../models");
const { selectUser } = require("../../models/user");

const Refresh = async (req, res) => {
  if (req.method === "GET") {
    const [result, data] = await verifyRefreshToken(req, res);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (result) {
      const [resultSelectUser, dataSelectUser] = await selectUser(connect(), {
        id: data.id,
      });
      console.log(data);
      const [accessToken] = createAccessToken(data);
      res.end(
        JSON.stringify({
          result,
          data: {
            accessToken,
            email: data.email,
            isSurvey: dataSelectUser.user.isSurvey,
          },
        })
      );
    } else {
      res.end(JSON.stringify({ result, data }));
    }
  }
};

module.exports = {
  Refresh,
};
