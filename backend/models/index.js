require("dotenv").config({ path: "./../.env" });

const env = process.env.NODE_ENV || "DEVELOPMENT";
const mysql = require("mysql2");

module.exports = () => {
  function config() {
    // mysql connect
    const connection = mysql.createConnection({
      host: `${env}_MLOG`,
      user: "root",
      password: process.env[`${env}_DB_PASSWORD`],
    });

    // connection success||failure eventHandler
    connection.connect((err) => {
      if (err) throw err;
      else {
        console.log("(step1) 연결 성공");
        console.log("(step2-1) SCHEMA 생성시작");
        // create mlog database
        connection.query(
          "CREATE SCHEMA IF NOT EXISTS mlog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci",
          (err) => {
            if (err) throw err;
            console.log("(step2-2) SCHEMA 생성 완료");
            console.log("(step3) tables 생성 시작");
            createTable(connection);
          }
        );
      }
    });
    // create tables
    function createTable(connection) {}
  }
};
