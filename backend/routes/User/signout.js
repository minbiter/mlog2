const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { deleteToken } = require("../../models/token");

// 클라이언트는 백엔드응답을 필수적으로 받지 않아도 된다.
// 알아서 쿠키지우고 accessToken 지워도 됩니다.
const SignOut = async (req, res) => {
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    await deleteToken(await connect(), dataAuth.id);
    res.end(JSON.stringify({ result: resultAuth }));
  }
};

module.exports = {
  SignOut,
};
