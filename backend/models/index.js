require("dotenv").config();
const mysql = require("mysql2/promise");
const User = require("./user");
const Diary = require("./diary");
const Sentiment = require("./sentiment");
const Music = require("./music");
const diaryMusic = require("./diaryMusic");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const config = async () => {
  // mysql connect
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env[`${env}_DB_PASSWORD`],
  });
  // connection success
  console.log("(step1) 연결 성공");
  console.log("(step2-1) SCHEMA 생성시작");
  // create mlog database
  await connection.query(
    "CREATE SCHEMA IF NOT EXISTS mlog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci"
  );
  console.log("(step2-2) SCHEMA 생성 완료");
  console.log("(step3) tables 생성 시작");
  await createTable(connection);

  // create tables
  async function createTable(connection) {
    await User.init(connection);
    console.log("(step3-1) user table 생성 완료");
    await Diary.init(connection);
    console.log("(step3-2) diary table 생성 완료");
    await Sentiment.init(connection);
    console.log("(step3-3) sentiment table 생성 완료");
    await Music.init(connection);
    console.log("(step3-4) music table 생성 완료");
    await diaryMusic.init(connection);
    console.log("(step3-5) diaryMusic table 생성 완료");
  }
};

module.exports = {
  config,
};
