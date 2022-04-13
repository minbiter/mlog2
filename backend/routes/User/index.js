const { URL } = require("url");
const { Login } = require("./login");
const { SignUp } = require("./signup");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const User = async (req, res) => {
  const url = new URL(req.url, process.env[`${env}_URL`]);
  if (url.pathname === "/user") {
    // 로그인 & 로그아웃
    if (req.method === "POST") {
      console.log("login: session 생성");
      Login(req, res);
    } else if (req.method === "DELETE") {
      console.log("logout: session 끊음");
    }
  } else if (url.pathname === "/user/signup") {
    // 회원가입
    if (req.method === "POST") {
      console.log("회원가입");
      SignUp(req, res);
    }
  } else if (url.pathname.startsWith("/user/")) {
    // 회원탈퇴 & 회원수정
    if (req.method === "DELETE") {
      console.log("회원탈퇴");
    } else if (req.method === "FATCH") {
      console.log("회원수정");
    }
  }
};

module.exports = {
  User,
};
