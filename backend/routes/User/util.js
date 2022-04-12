const { connect } = require("./../../models");
const { isExistEmail, isSamePassword } = require("./../../models/user");
const jwt = require("jsonwebtoken");

const isValidSignUp = async (email, password, passwordConfirm) => {
  let [emailResultOne, emailMemoOne] = isValidEmail(email);
  let emailResultTwo = null;
  let emailMemoTwo = null;
  if (emailResultOne) {
    [emailResultTwo, emailMemoTwo] = await isExistEmail(await connect(), email);
  }
  let [passwordResult, passwordMemo] = isValidPassword(password);
  let [passwordConfirmResult, passwordConfirmMemo] = isValidPasswordConfirm(
    password,
    passwordConfirm
  );

  if (emailResultOne && !emailResultTwo && passwordResult && passwordConfirmResult) {
    return [true, {}];
  }
  return [
    false,
    { ...emailMemoOne, ...emailMemoTwo, ...passwordMemo, ...passwordConfirmMemo },
  ];
};

const isValidLogin = async (email, password) => {
  let [emailResultOne] = isValidEmail(email);

  let emailResultTwo = null;
  if (emailResultOne) {
    [emailResultTwo] = await isExistEmail(await connect(), email);
  }

  let [passwordResultOne] = isValidPassword(password);

  let passwordResultTwo = null;
  let passwordMemoTwo = null;
  if (emailResultTwo) {
    [passwordResultTwo, passwordMemoTwo] = await isSamePassword(await connect(), {
      email,
      password,
    });
  }

  if (emailResultOne && emailResultTwo && passwordResultOne && passwordResultTwo) {
    return [true, { ...passwordMemoTwo }];
  }
  return [false, { login: "이메일 또는 비밀번호를 확인해주세요." }];
};

const isValidEmail = (email) => {
  let result = true;
  let memo = {};

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    result = false;
    memo.email = "이메일 형식이 올바르지 않습니다.";
  }

  return [result, memo];
};

const isValidPassword = (password) => {
  let result = true;
  let memo = {};

  if (password.length < 8 || password.length > 29 || password.includes(" ")) {
    result = false;
    memo.password = "8자 이상 28자 이하 입력 (공백 제외)";
  }

  return [result, memo];
};

const isValidPasswordConfirm = (password, passwordConfirm) => {
  let result = true;
  let memo = {};

  if (password !== passwordConfirm) {
    result = false;
    memo.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }

  return [result, memo];
};

const createToken = (data) => {
  // create json-web-token.(HMAC SHA256)
  const accessTokenExpire = new Date();
  accessTokenExpire.setDate(accessTokenExpire.getDate() + 1);
  const refreshTokenExpire = new Date();
  refreshTokenExpire.setDate(refreshTokenExpire.getDate() + 7);
  const accessToken = jwt.sign(
    {
      id: `${data.id}`,
      email: `${data.email}`,
      exp: Math.floor(accessTokenExpire / 1000),
    },
    `${process.env.TOKEN_KEY}`
  );
  const refreshToken = jwt.sign(
    {
      id: `${data.id}`,
      exp: Math.floor(refreshTokenExpire / 1000),
    },
    `${process.env.TOKEN_KEY}`
  );
  return [accessToken, accessTokenExpire, refreshToken, refreshTokenExpire];
};

module.exports = {
  isValidSignUp,
  isValidLogin,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
  createToken,
};
