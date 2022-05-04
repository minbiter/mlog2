const bcrypt = require("bcrypt");

async function init(connection) {
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
    "SELECT id, email, password FROM mlog.user WHERE email = ?;",
    [data.email]
  );
  const result = await bcrypt.compare(data.password, rows[0].password);
  if (result) {
    return [result, { id: rows[0].id, email: rows[0].email }];
  } else {
    return [result];
  }
}

module.exports = {
  init,
  isExistEmail,
  insertUser,
  isSamePassword,
};
