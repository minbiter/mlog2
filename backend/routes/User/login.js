const { isValidLogin, createAccessToken, createRefeshToken } = require("./util");
const { connect } = require("./../../models");
const { insertToken, deleteToken } = require("./../../models/token");

const Login = async (req, res) => {
  let payload = "";
  req.on("data", (data) => {
    payload += data;
  });
  req.on("end", async () => {
    const parsePayload = JSON.parse(payload);
    let [result, data] = await isValidLogin(parsePayload.email, parsePayload.password);

    if (result) {
      // Create Token.
      const [accessToken, accessTokenExpire] = createAccessToken(data);
      const [refreshToken, refreshTokenExpire] = createRefeshToken(data);
      // DELETE user's Refresh Token.
      await deleteToken(await connect(), data.id);
      // INSERT user's Refresh Token.
      await insertToken(await connect(), {
        uid: data.id,
        jwt: refreshToken,
        expires: refreshTokenExpire,
      });
      // Response msg included Refesh Token, Access Token.
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Set-Cookie": [
          `access_token=${accessToken}; Expires=${accessTokenExpire.toGMTString()}; HttpOnly; Path=/`,
          `refresh_token=${refreshToken}; Expires=${refreshTokenExpire.toGMTString()}; HttpOnly; Path=/`,
        ],
      });
      res.end(JSON.stringify({ result, data }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ result, data }));
    }
  });
};

module.exports = {
  Login,
};
