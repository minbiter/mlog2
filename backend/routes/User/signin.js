const { isValidSignIn } = require("./util");
const { createAccessToken, createRefeshToken } = require("./../middleware/token");
const { connect } = require("../../models");
const { insertToken, deleteToken, selectToken } = require("../../models/token");

const SignIn = async (req, res) => {
  let payload = "";
  req.on("data", (data) => {
    payload += data;
  });
  req.on("end", async () => {
    const parsePayload = JSON.parse(payload);
    let [result, data] = await isValidSignIn(parsePayload.email, parsePayload.password);
    res.statusCode = 200;
    if (result) {
      // Create Token.
      const [accessToken] = createAccessToken(data);
      let refreshToken = null;
      let refreshTokenExpire = null;
      if (parsePayload.email === "guest@mlog.com") {
        const guestToken = await selectToken(connect(), 1);
        [refreshToken, refreshTokenExpire] = [guestToken.jwt, guestToken.expires];
      } else {
        [refreshToken, refreshTokenExpire] = createRefeshToken(data);
        // DELETE user's Refresh Token.
        await deleteToken(connect(), data.id);
        // INSERT user's Refresh Token.
        await insertToken(connect(), {
          uid: data.id,
          jwt: refreshToken,
          expires: refreshTokenExpire,
        });
      }
      // Response msg included Refesh Token in Set-Cookie, Access Token in HTTP body.
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Set-Cookie", [
        `refreshToken=${refreshToken}; Expires=${refreshTokenExpire.toGMTString()}; HttpOnly; SameSite=Lax; Path=/`,
      ]);
      data.accessToken = accessToken;
      res.end(JSON.stringify({ result, data }));
    } else {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ result, data }));
    }
  });
};

module.exports = {
  SignIn,
};
