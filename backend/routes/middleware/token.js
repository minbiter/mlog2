const jwt = require("jsonwebtoken");
const { connect } = require("./../../models");
const { selectToken } = require("./../../models/token");
const { createAccessToken } = require("./../User/util");

// token 유효성 검사
const tokenAuthentication = async (req, res) => {
  const { access_token, refresh_token } = parseCookies(req.headers.cookie);
  let result = false;
  let data = {};
  if (!(access_token || refresh_token)) {
    // 1. access, refresh 둘다 없을 때.
    // 다음 미들웨어로 못 넘김.
    // { result: false, data: {token: 'TokenNotExistError'} }
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    data.token = "TokenNotExistError";
    res.end(JSON.stringify({ result, data }));
  } else if (access_token) {
    // 2. access가 왔을 때
    try {
      // 2-1. access_token이 정상적이면, 다음 미들웨어로 넘김
      jwt.verify(access_token, `${process.env.TOKEN_KEY}`);
    } catch (err) {
      // 2-2. access_token이 정상적이지 않으면,
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      if (err.name === "TokenExpiredError") {
        // 2-2-1. TokenExpiredError.
        // 다음 미들웨어로 못 넘어감.
        // { result: false, data: {access_token: 'TokenExpiredError'} }
        data.access_token = "TokenExpiredError";
        res.end(JSON.stringify({ result, data }));
      } else if (err.name === "JsonWebTokenError") {
        // 2-2-2. JsonWebTokenError.
        // 다음 미들웨어로 못 넘어감.
        // { result: false, data: {access_token: 'JsonWebTokenError'} }
        data.access_token = "JsonWebTokenError";
        res.end(JSON.stringify({ result, data }));
      }
    }
  } else if (refresh_token) {
    // 3. refresh가 왔을 때
    try {
      // 3-1. refresh_token이 정상적이면(db의 jwt와 비교)
      const { uid } = jwt.verify(refresh_token, `${process.env.TOKEN_KEY}`);
      const { jwt: db_token } = await selectToken(await connect(), uid);
      if (db_token === refresh_token) {
        // 헤더에 accessToken을 추가하고 다음 미들웨어 넘김
        const [accessToken, accessTokenExpire] = createAccessToken({ uid });
        res.setHeader(
          "Set-Cookie",
          `access_token=${accessToken}; Expires=${accessTokenExpire.toGMTString()}; HttpOnly; Path=/`
        );
      } else {
        throw { name: "JsonWebTokenError" };
      }
    } catch (err) {
      // 3-2. refresh_token이 정상적이지 않으면,
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      if (err.name === "TokenExpiredError") {
        // 3-2-1. TokenExpiredError.
        // 다음 미들웨어로 못 넘어감.
        // { result: false, data: {refreshToken: 'TokenExpiredError'} }
        data.refresh_token = "TokenExpiredError";
        res.end(JSON.stringify({ result, data }));
      } else if (err.name === "JsonWebTokenError") {
        // 3-2-2. JsonWebTokenError.
        // 다음 미들웨어로 못 넘어감.
        // { result: false, data: {refreshToken: 'JsonWebTokenError'} }
        data.refresh_token = "JsonWebTokenError";
        res.end(JSON.stringify({ result, data }));
      }
    }
  }
};

const parseCookies = (cookie = "") => {
  return cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

module.exports = {
  tokenAuthentication,
};
