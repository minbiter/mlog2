const jwt = require("jsonwebtoken");
const { connect } = require("./../../models");
const { selectToken } = require("./../../models/token");

const authentication = (req, res) => {
  const [result, data] = verifyAccessToken(req, res);
  if (!result) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ result, data }));
    return [result, data];
  }
  return [result, data];
};

const createAccessToken = (data) => {
  // create json-web-token.(HMAC SHA256)
  const accessTokenExpire = new Date();
  accessTokenExpire.setDate(accessTokenExpire.getDate() + 1);

  const accessToken = jwt.sign(
    {
      id: `${data.id}`,
      email: `${data.email}`,
      exp: Math.floor(accessTokenExpire / 1000),
    },
    `${process.env.TOKEN_KEY}`
  );

  return [accessToken, accessTokenExpire];
};

const createRefeshToken = (data) => {
  // create json-web-token.(HMAC SHA256)
  const refreshTokenExpire = new Date();
  refreshTokenExpire.setDate(refreshTokenExpire.getDate() + 7);

  const refreshToken = jwt.sign(
    {
      id: `${data.id}`,
      email: `${data.email}`,
      exp: Math.floor(refreshTokenExpire / 1000),
    },
    `${process.env.TOKEN_KEY}`
  );

  return [refreshToken, refreshTokenExpire];
};

const verifyAccessToken = (req, res) => {
  let accessToken = null;
  try {
    accessToken = req.headers.authorization.split(" ")[1];
  } catch (err) {
    return [false, { accessToken: "JsonWebTokenError" }];
  }
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, `${process.env.TOKEN_KEY}`);
      return [true, { ...decoded }];
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return [false, { accessToken: "TokenExpiredError" }];
      } else if (err.name === "JsonWebTokenError") {
        return [false, { accessToken: "JsonWebTokenError" }];
      }
    }
  } else {
    return [false, { accessToken: "TokenNotExistError" }];
  }
};

const verifyRefreshToken = async (req, res) => {
  const { refreshToken } = parseCookies(req.headers.cookie);
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, `${process.env.TOKEN_KEY}`);
      const { jwt: db_token } = await selectToken(connect(), decoded.id);
      if (db_token === refreshToken) {
        return [true, { ...decoded }];
      } else {
        throw { name: "JsonWebTokenError" };
      }
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return [false, { refreshToken: "TokenExpiredError" }];
      } else if (err.name === "JsonWebTokenError") {
        return [false, { refreshToken: "JsonWebTokenError" }];
      }
    }
  } else {
    return [false, { refreshToken: "TokenNotExistError" }];
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
  authentication,
  createAccessToken,
  createRefeshToken,
  verifyAccessToken,
  verifyRefreshToken,
  parseCookies,
};
