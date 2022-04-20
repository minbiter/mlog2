const { SignIn } = require("./signin");
const { SignUp } = require("./signup");
const { SignOut } = require("./signout");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const User = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  if (url.pathname === "/user") {
    // 로그인 & 로그아웃
    if (req.method === "POST") {
      console.log("SignIn: token 생성");
      SignIn(req, res);
    } else if (req.method === "DELETE") {
      console.log("SignOut: token 삭제");
      SignOut(req, res);
    }
  } else if (url.pathname === "/user/signup") {
    // 회원가입
    if (req.method === "POST") {
      console.log("SignUp");
      SignUp(req, res);
    }
  } else if (url.pathname.startsWith("/user/")) {
    // 회원탈퇴 & 회원수정
    if (req.method === "DELETE") {
      console.log("DeleteAccount");
    } else if (req.method === "FATCH") {
      console.log("EditAccount");
    }
  }
};

module.exports = {
  User,
};
