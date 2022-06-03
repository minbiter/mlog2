const bcrypt = require("bcrypt");

async function init(connection) {
  const [rows] = await connection.query(
    "\
    SELECT 1 FROM Information_schema.tables\
    WHERE table_schema = 'mlog'\
    AND table_name = 'user'\
    "
  );
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.user (\
      id INT NOT NULL AUTO_INCREMENT,\
      email VARCHAR(50) UNIQUE,\
      password VARCHAR(100),\
      provider VARCHAR(10) NOT NULL DEFAULT 'local',\
      snsId VARCHAR(50),\
      isSurvey boolean DEFAULT false,\
      createdAt DATETIME NOT NULL DEFAULT now(),\
      updatedAt DATETIME NOT NULL DEFAULT now(),\
      deletedAt DATETIME,\
      PRIMARY KEY (id)\
    ) ENGINE=InnoDB;"
  );
  if (!rows.length) await insertGuestUser(connection);
}

async function insertGuestUser(connection) {
  const hashPassword = await bcrypt.hash("mlog1234", 12);
  await connection.execute(
    `
  INSERT INTO mlog.user (email, password) VALUES (?, ?);
  `,
    ["guest@mlog.com", hashPassword]
  );
  console.log("guest@mlog.com 생성");
}

async function selectUser(connection, data) {
  const [rows] = await connection.execute("SELECT * from mlog.user WHERE id = ?", [
    data.id,
  ]);
  if (rows.length) {
    return [true, { user: rows[0] }];
  }
  return [false];
}

async function isExistEmail(connection, email) {
  let result = false;
  let memo = {};
  const [rows] = await connection.execute(
    "SELECT email FROM mlog.user WHERE email = ?;",
    [email]
  );

  if (rows.length) {
    result = true;
    memo.email = "이미 존재하는 사용자 이메일입니다.";
  }
  return [result, memo];
}

async function insertUser(connection, data) {
  const hashPassword = await bcrypt.hash(data.password, 12);
  await connection.execute("INSERT INTO mlog.user (email, password) VALUES (?, ?);", [
    data.email,
    hashPassword,
  ]);
}

async function isSamePassword(connection, data) {
  const [rows] = await connection.execute(
    "SELECT id, email, password, isSurvey FROM mlog.user WHERE email = ?;",
    [data.email]
  );
  const result = await bcrypt.compare(data.password, rows[0].password);
  if (result) {
    return [result, { id: rows[0].id, email: rows[0].email, isSurvey: rows[0].isSurvey }];
  } else {
    return [result];
  }
}

async function surveyComplete(connection, data) {
  const [rows] = await connection.execute(
    "UPDATE mlog.user SET isSurvey = 1 WHERE id = ?;",
    [data.id]
  );
}

module.exports = {
  init,
  selectUser,
  isExistEmail,
  insertUser,
  isSamePassword,
  surveyComplete,
};
