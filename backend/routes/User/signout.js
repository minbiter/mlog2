const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { deleteToken, selectToken } = require("../../models/token");
const { parseCookies } = require("../middleware/token");

const SignOut = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    const { refreshToken } = parseCookies(req.headers.cookie);
    const refreshTokenExpire = new Date();
    refreshTokenExpire.setFullYear(refreshTokenExpire.getFullYear() - 30);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Set-Cookie", [
      `refreshToken=${refreshToken}; Expires=${refreshTokenExpire.toGMTString()}; HttpOnly; SameSite=Lax; Path=/`,
    ]);
    if (refreshToken !== (await selectToken(connect(), 1)).jwt) {
      await deleteToken(connect(), dataAuth.id);
    }
    res.end(JSON.stringify({ result: resultAuth }));
  }
};

module.exports = {
  SignOut,
};
